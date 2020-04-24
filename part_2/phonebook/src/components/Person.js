import React from "react";

const Person = (props) => {
  return (
    <div>
      <p>
        {`${props.person.name}:   ${props.person.number}  `}
        <button onClick={() => props.deletePerson(props.index)}>Delete</button>
      </p>
    </div>
  );
};

export default Person;
