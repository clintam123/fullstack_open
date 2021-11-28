import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdoteOf } from "../reducers/anecdoteReducer";

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdoteOf(id));
  };

  return (
    <div>
      {anecdotes
        .sort((x, y) => y.votes - x.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} votes
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
