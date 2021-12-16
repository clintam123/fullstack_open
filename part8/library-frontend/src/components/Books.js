import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all genres");

  useEffect(() => {
    if (result.data) {
      const books = result.data.allBooks;
      let genres = ["all genres"];
      books.forEach((book) => {
        book.genres.forEach((genre) => {
          if (genres.indexOf(genre) === -1) {
            genres.push(genre);
          }
        });
      });
      setGenres(genres);
      setSelectedGenre("all genres");
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <p>in genre {selectedGenre}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) =>
              selectedGenre === "all genres"
                ? book
                : book.genres.includes(selectedGenre)
            )
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => setSelectedGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
