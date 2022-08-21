const { UserInputError, AuthenticationError } = require("apollo-server");
const config = require("./src/config");
const { PubSub } = require("graphql-subscriptions");
const Book = require("./src/models/book");
const Author = require("./src/models/author");
const jwt = require("jsonwebtoken");
const User = require("./src/models/user");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => {
      return Author.collection.countDocuments();
    },
    allBooks: async (root, arg) => {
      let returnBook = await Book.find({}).populate("author"); //using "drop-down" method, rather elegant.
      console.log("returnBook is: ", returnBook);
      if (arg.author) {
        returnBook = returnBook.filter(
          (book) => book.author.name === arg.author
        );
      }
      if (arg.genre) {
        return await Book.find({ genres: { $in: [arg.genre] } }).populate(
          "author"
        );
      }

      return returnBook;
    },

    allAuthors: async (root, arg) => {
      let returnAuthor = await Author.find({});

      if (arg.author) {
        returnAuthor = returnAuthor.find({ name: arg.author });
      }
      return returnAuthor;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let author = await Author.findOne({ name: args.author });
      const repeatBook = await Book.findOne({ title: args.title });

      if (repeatBook) {
        throw new UserInputError("Book title has already been added!", {
          invalidArgs: args.title,
        });
      }

      if (!author) {
        author = await new Author({ name: args.author, bookCount: 1 }).save(); //create new Author object, and save to mongo.
      } else {
        author.bookCount = author.bookCount + 1;
        await author.save();
      }

      const book = await new Book({
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book }); //for subscription
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const authortoEdit = await Author.findOne({ name: args.name });
      authortoEdit.born = args.setBornTo;

      try {
        await authortoEdit.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return authortoEdit;
    },
    createUser: async (root, args) => {
      const user = await new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }; //creates the token that will help verify the current user
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
