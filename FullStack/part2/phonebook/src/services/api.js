import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getContacts = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addContact = (contact) => {
  return axios.post(baseUrl, contact).then((response) => response.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.status);
};

const updateContact = (id, newContact) => {
    return axios.put(`${baseUrl}/${id}`, newContact).then((response) => response.data);
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default { getContacts, addContact, deleteContact, updateContact };
