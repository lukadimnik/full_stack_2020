import React from "react";

const Searchfilter = props => {
  return (
    <div>
      <div>
        Filter shown with{" "}
        <input value={props.filter} onChange={props.handleFilter} />
      </div>
    </div>
  );
};

export default Searchfilter;
