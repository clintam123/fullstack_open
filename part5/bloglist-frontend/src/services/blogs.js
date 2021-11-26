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

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config);
  console.log(response);
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  console.log(response);
  return response.data;
};

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  console.log(response);
  return response.data;
};

const obj = { getAll, setToken, create, update, remove };
export default obj;
