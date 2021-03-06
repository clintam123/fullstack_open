import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorBorn, setAuthorBorn] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      console.log(error);
      setError(error.graphQLErrors[0].message);
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: {
        title,
        author: {
          name: authorName,
          born: authorBorn === "" ? null : authorBorn,
        },
        published,
        genres,
      },
    });

    setTitle("");
    setPublished("");
    setAuthorName("");
    setAuthorBorn("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author name
          <input
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </div>
        <div>
          author born
          <input
            type="number"
            value={authorBorn}
            onChange={({ target }) => setAuthorBorn(parseInt(target.value))}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
