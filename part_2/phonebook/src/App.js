import React, { useState, useEffect } from "react";
import Numbers from "./components/Numbers";
import Searchfilter from "./components/Searchfilter";
import Form from "./components/Form";
import Person from "./components/Person";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    // create a new person object with new name
    const personObject = {
      name: newName,
      number: newNumber,
    };

    // check if array of persons includes person with the name user is trying to add
    if (persons.find((person) => person.name === newName)) {
      // inform user that user with the name already exists and ask if he wants to update number
      if (
        window.confirm(
          `${newName} is already added to phonebook. Would you like to replace the number with a new one?`
        )
      ) {
        // we get the id of the person whose number we will update
        const updatedPersonsId = persons.find(
          (person) => person.name === newName
        ).id;

        // we send the put request and reset the persons array with the new number
        personService
          .update(updatedPersonsId, personObject)
          .then(() => {
            let updatedPersonsArray = persons.filter(
              (person) => person.name !== newName
            );
            updatedPersonsArray = [...updatedPersonsArray, personObject];
            setPersons(updatedPersonsArray);
            setNotificationMessage(`${personObject.name}'s number is updated!`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((err) => {
            setNotificationMessage(
              `Information of ${personObject.name} has already been removed from server`
            );
            setIsError(true);
            setTimeout(() => {
              setNotificationMessage(null);
              setIsError(false);
            }, 5000);
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationMessage(`Successfully added ${personObject.name}!`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => console.error(err));
    }
  };

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to remove this person?")) {
      personService
        .remove(id)
        .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
        })
        .catch((err) => console.error(err));
    }
  };

  const renderRows = persons
    .filter((person) => person.name.toLowerCase().includes(filter))
    .map((person, i) => (
      <Person
        key={i}
        person={person}
        deletePerson={deletePerson}
        index={person.id}
      />
    ));

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notificationMessage} isError={isError} />
      <Searchfilter filter={filter} handleFilter={handleFilter} />
      <Form
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        addPerson={addPerson}
      />
      <Numbers renderRows={renderRows} />
    </div>
  );
};

export default App;

// { "name": "Arto Hellas", "number": "234-435634", "id": 1 },
// { "name": "Lydia French", "number": "234-4232334", "id": 2 },
// { "name": "Julia Roberts", "number": "21254-435634", "id": 3 },
// { "name": "Conor McGregor", "number": "204-430034", "id": 4 },
// { "name": "Urho Kekkonen", "number": "2398-435634", "id": 5 },
// { "name": "Ada Lovelace", "number": "39-44-5323523", "id": 6 },
// { "name": "Dan Abramov", "number": "12-43-234345", "id": 7 },
// { "name": "Mary Poppendieck", "number": "39-23-6423122", "id": 8 },

// {
//   "name": "Mary Poppendieck",
//   "number": "39-23-6423122",
//   "id": 9
// },
// {
//   "name": "johnny",
//   "number": "knoxwile",
//   "id": 10
// },
// {
//   "name": "Frida",
//   "number": "5895-657",
//   "id": 11
// },
// {
//   "name": "dodo",
//   "number": "78922-5547",
//   "id": 12
// }
