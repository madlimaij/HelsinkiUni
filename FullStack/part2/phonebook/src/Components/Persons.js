import React from 'react';

const Persons = ({ filteredPersons, onClick }) => {
  return (
    <>
      {filteredPersons.map((person) => (
          <div key={person.id}>
            <span>{person.name} {person.number} </span>
            <button onClick={()=>onClick(person)}>delete</button>
          </div>
      ))}
    </>
  );
};

export default Persons;
