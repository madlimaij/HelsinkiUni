import { useEffect, useState } from 'react';
import './App.css';

import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Persons from './Components/Persons';
import contactsService from './services/api';
import Notification from './Components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
 
  useEffect(() => {
    contactsService
      .getContacts()
      .then((contacts) => {
        setPersons(contacts);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      const person_b = persons.find((p) => p.name === newName);
      Object.assign(person_b, { number: newNumber });
      window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      ) &&
        contactsService
          .updateContact(person_b.id, person_b)
          .then((contact) =>
            setPersons(
              persons.filter((p) => (p.id === person_b.id ? contact : p))
            )
          );
    } else
      contactsService
        .addContact(newContact)
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact));
          setNewName('');
          setNewNumber('');
          setMessage(`Added '${returnedContact.name}'`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.message);
          setError(true)
          setMessage(
            `Information of ${newContact.name} has already been removed from server.`
          );
          setTimeout(() => {
            setMessage(null);
            setError(false)
          }, 5000);
        });
  };

  const handleDelete = (person) => {
    window.confirm(`Delete ${person.name} ?`) &&
      contactsService
        .deleteContact(person.id)
        .then((status) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          console.log(status);
        })
        .catch((error) => {
          console.log(error.message);
          setError(true);
          setMessage(
            `Information of ${person.name} has already been removed from server.`
          );
          setTimeout(() => {
            setError(false)
            setMessage(null);
          }, 5000);
        });
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setNewSearch(e.target.value);
  };

  const filtered = !newSearch
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      );

  const msgStyle = {
    color: error ? "red" : 'green',
    background: 'lightgrey',
    fontSize: 14,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      {message && <Notification message={message} messageStyle={msgStyle} />}
      <Filter handleFilter={handleFilter} />
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filtered} onClick={handleDelete} />
    </div>
  );
};

export default App;
