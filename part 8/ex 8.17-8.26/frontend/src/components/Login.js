import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("error is: ", error.message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log("token exists");
      props.setToken(token);
      localStorage.setItem("library-user-token", token);
      props.setPage("authors");
    }
  }, [result.data]);

  const checklogin = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={checklogin}>
        <div>
          username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  );
};

export default Login;
