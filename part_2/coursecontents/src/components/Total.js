import React from "react";

const Total = props => {
  const total = props.parts.reduce((s, p) => s + p.exercises, 0);

  return <strong>Total number of exercises: {total}</strong>;
};

export default Total;
