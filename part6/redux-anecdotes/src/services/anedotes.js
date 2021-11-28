import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (content) => {
  const obj = { content, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const incrementVotes = async (id) => {
  const anecdoteToVote = await getOne(id);
  anecdoteToVote.votes += 1;
  const response = await axios.put(`${baseUrl}/${id}`, anecdoteToVote);
  return response.data;
};

const anecdoteService = { getAll, create, incrementVotes };
export default anecdoteService;
