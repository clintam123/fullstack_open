import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config);
  console.log(response.data);
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const obj = { getAll, setToken, create, update, remove };
export default obj;
