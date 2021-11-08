import React, { useEffect, useState } from "react";
import FilterPerson from "./components/FilterPerson";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import pbServices from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    pbServices.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    const person = persons.filter(
      (person) => person.name === personObject.name
    );
    if (person.length > 0) {
      const updatedPerson = { ...person[0], number: newNumber };
      if (
        window.confirm(
          `${updatedPerson.name} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        pbServices
          .update(updatedPerson.id, updatedPerson)
          .then((p) => {
            setPersons(
              persons.map((personObj) =>
                personObj.id === updatedPerson.id ? p : personObj
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage(`${updatedPerson.name} was successfully updated`);
            setTimeout(() => {
              setMessage(null);
            }, 6000);
          })
          .catch((error) => {
            console.log(error);
            setPersons(persons.filter((p) => p.id !== updatedPerson.id));
            setNewName("");
            setNewNumber("");
            setMessage(
              `ERROR: ${updatedPerson.name} was already deleted from the server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 6000);
          });
      }
    } else {
      pbServices.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessage(`${newName} was successfully added`);
        setTimeout(() => {
          setMessage(null);
        }, 6000);
      });
    }
  };

  const deletePerson = (id) => {
    const filteredPerson = persons.filter((person) => person.id === id);
    const personName = filteredPerson[0].name;
    const personId = filteredPerson[0].id;
    if (window.confirm(`Delete ${personName} ?`)) {
      pbServices.erase(personId);
      setMessage(`${personName} was successfully deleted`);
      setPersons(persons.filter((person) => person.id !== id));
      setTimeout(() => {
        setMessage(null);
      }, 6000);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <FilterPerson
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newSearch={newSearch}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
