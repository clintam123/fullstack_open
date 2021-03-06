import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdoteOf } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdoteOf(anecdote.id));
    dispatch(setNotification(`You voted for anecdote ${anecdote.content}`, 5));
  };

  return (
    <div>
      {filteredAnecdotes
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
