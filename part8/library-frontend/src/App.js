import React, { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import RecommendedBooks from "./components/RecommendedBooks";

import { useApolloClient, useSubscription } from "@apollo/client";

import { BOOK_ADDED, ALL_BOOKS } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`Book ${subscriptionData.data.bookAdded.title} added`);
      updateCacheWith(addedBook);
    },
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} setError={notify} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />

      <RecommendedBooks show={page === "recommend"} />
    </div>
  );
};

export default App;
