import React from "react";
import Part from "./Part";

const Content = props => {
  const renderParts = props.course.parts.map(part => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));

  return <div>{renderParts}</div>;
};

export default Content;
