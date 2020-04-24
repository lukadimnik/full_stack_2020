import React from "react";

const Searchfilter = props => {
  return (
    <div>
      Find countries{" "}
      <input value={props.filterValue} onChange={props.handleFilterChange} />
    </div>
  );
};

export default Searchfilter;
