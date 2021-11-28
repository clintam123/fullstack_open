const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const anecdoteToVote = state.find(
        (anecdote) => anecdote.id === action.data.id
      );
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
      );
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdoteOf = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const createAnecdote = (data) => {
  return {
    type: "NEW_ANECDOTE",
    data,
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

export default anecdoteReducer;
