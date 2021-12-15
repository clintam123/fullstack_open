import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER, ALL_BOOKS } from "../queries";

const RecommendedBooks = ({ show }) => {
  const books_result = useQuery(ALL_BOOKS);
  const user_result = useQuery(GET_USER);

  if (!show) {
    return null;
  }

  if (books_result.loading || user_result.loading) {
    return <div>loading...</div>;
  }

  const books = books_result.data.allBooks;
  const user = user_result.data.me;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <em>{user.favoriteGenre}</em>
      </p>
      <table>
        <tbody>
          <tr>
            <th>book</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => book.genres.includes(user.favoriteGenre))
            .map((a) => (
              <tr key={a.id}>
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
