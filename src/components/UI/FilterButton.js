import React from "react";

import cls from 'classnames'

import "./FilterButton.css";

const FilterButton = ({ competence, id, filterOnClick, selected }) => {
  console.log(selected)
  return (
    <button
      id="filter"
      className={cls(selected.join("").includes(competence) && "active")}
      value={competence}
      onClick={filterOnClick}
    >
      {competence}
    </button>
  );
};

export default FilterButton;
