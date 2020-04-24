import React from "react";

const Numbers = props => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>{props.renderRows}</div>
    </div>
  );
};

export default Numbers;
