import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, { pollInterval: 3000 });
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const setBornTo = Number(born);

  const submit = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo } });
    setName("");
    setBorn("");
  };

  if (result.loading) {
    //this is super important to ensure that the result will not screw over the entire app.
    //it ensures that there IS A RESPONSE! then it can continue to execute the following code properly.
    return <div>loading</div>;
  }

  if (!props.show) {
    return null;
  }

  const authors = result.data.allAuthors;
  console.log("authors is: ", authors);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Set Birthyear</h2>
        <form onSubmit={submit}>
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
            <div>
              <button type="submit">update author</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authors;

/*<select
onChange={({ target }) => setName(target.value)}
options={authors.map((a) => {
  return { label: a.name, value: a.id };
})}
></select>*/
