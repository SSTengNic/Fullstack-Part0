import { ALL_BOOKS, EXTRACT_USER } from "../queries";
import { useQuery } from "@apollo/client";

const Recommend = (props) => {
  const currentUser = useQuery(EXTRACT_USER);

  const userinfo = currentUser?.data?.me;
  const genre = String(userinfo?.favouriteGenre);
  const result = useQuery(ALL_BOOKS, { variables: { genre } });

  const books = result?.data?.allBooks;
  console.log("G. recommend, books are: ", books);

  if (!props.show) {
    return null;
  }

  if (result.loading || currentUser.loading) {
    <div>Loading...</div>;
  }

  return (
    <div>
      <div>books in your favourite genre {userinfo.favouriteGenre}</div>
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
    </div>
  );
};
export default Recommend;
