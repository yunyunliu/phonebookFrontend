import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data);
};

const deleteEntry = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newEntry) => {
  const request = axios.put(`${baseUrl}/${id}`, newEntry);
  return request.then(updated => updated.data);
}
  
export default {getAll, create, deleteEntry, update};