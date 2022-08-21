import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useApolloClient, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, book) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allPersons: uniqByName(allBooks.concat(book)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const book = subscriptionData.data.bookAdded;
      window.alert(`${book.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, book);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  //not sure if there is a better way to format the buttons so that i dont have to repeat 'authors' and 'books' twice.
  //im repeating them twice so that i can format them in a straight line. If not, 'authors' and 'books' will be on topm
  // and 'logout' and 'add book' will be below them.
  return (
    <div>
      {token === null ? (
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
          <button onClick={logout}>logout</button>
        </div>
      )}

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
