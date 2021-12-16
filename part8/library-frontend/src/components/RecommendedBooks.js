import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_USER, ALL_BOOKS_BY_GENRE } from "../queries";

const RecommendedBooks = ({ show }) => {
  const user = useQuery(GET_USER);
  const [getFavoriteBooks, result] = useLazyQuery(ALL_BOOKS_BY_GENRE);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    if (user.data) {
      getFavoriteBooks({ variables: { genre: user.data.me.favoriteGenre } });
    }
  }, [user.data, getFavoriteBooks]);

  useEffect(() => {
    if (result.data) {
      setFavoriteBooks(result.data.allBooks);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <em>{user.data.me.favoriteGenre}</em>
      </p>
      <table>
        <tbody>
          <tr>
            <th>book</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map((a) => (
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

export default RecommendedBooks;
