import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("");
  const [genreArray, setgenreArray] = useState([]);
  const result = useQuery(ALL_BOOKS, { variables: { genre } });
  const books = result?.data?.allBooks;
  console.log("books is: ", books);

  useEffect(() => {
    if (result.data) {
      var genreArray = books.map((book) => {
        return book.genres[0];
      });
      console.log("genreArray is: ", genreArray);
      const uniqueGenre = [...new Set(genreArray)];
      console.log("genreArray is: ", uniqueGenre);
      setgenreArray(uniqueGenre);
    }
  }, [setGenre]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    <div>Loading...</div>;
  }

  const GenreButton = ({ genre }) => {
    console.log(typeof genre);
    return <button onClick={() => setGenre(genre)}>{genre}</button>;
  };

  return (
    <div>
      <h2>books</h2>
      <div>in genre {genre}</div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books &&
            books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre("")}>all Genre</button>
        {genreArray.map((genre) => (
          <GenreButton key={genre} genre={genre} />
        ))}
      </div>
    </div>
  );
};

export default Books;
