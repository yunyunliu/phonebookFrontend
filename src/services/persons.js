import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => {
    console.log(response.data);
    return response.data; // then method always returns a promise
  })
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