import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";
import Select from "react-select";

const BornYearForm = ({ notify, authors }) => {
  const [nameOptions, setNameOptions] = useState(null);
  const [born, setBorn] = useState("");

  const [changeBornYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
      notify(error.graphQLErrors[0].message);
    },
  });

  const options = [];
  authors.forEach((author) =>
    options.push({
      value: author.name,
      label: author.name,
    })
  );

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      notify("Author not found");
    }
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();

    changeBornYear({ variables: { name: nameOptions.value, setBornTo: born } });

    setNameOptions("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={nameOptions}
          onChange={setNameOptions}
          options={options}
        />
        <div>
          born{" "}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BornYearForm;
