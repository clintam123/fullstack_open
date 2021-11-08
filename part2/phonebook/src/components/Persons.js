import React from "react";
import Person from "./Person";

const Persons = (props) => {
  return (
    <ul>
      {props.persons
        .filter((person) =>
          person.name.toUpperCase().includes(props.newSearch.toUpperCase())
        )
        .map((person) => (
          <Person
            key={person.id}
            person={person}
            deletePerson={props.deletePerson}
          />
        ))}
    </ul>
  );
};

export default Persons;
