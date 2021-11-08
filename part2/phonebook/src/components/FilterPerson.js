import React from "react";

const FilterPerson = ({ newSearch, handleSearchChange }) => {
  return (
    <form>
      filter shown with
      <input value={newSearch} onChange={handleSearchChange} />
    </form>
  );
};

export default FilterPerson;
