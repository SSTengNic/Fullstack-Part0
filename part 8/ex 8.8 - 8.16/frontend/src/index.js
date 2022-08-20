import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const client = new ApolloClient({
  //the apollo client is used to send queries to the server
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink), //this is a black box to me at the moment, 19/08/2022
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {" "}
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
