import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdoteOf } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdoteOf(anecdote.id));
    dispatch(createNotification(`You voted for anecdote ${anecdote.content}`));
    setTimeout(() => dispatch(createNotification("")), 5000);
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
