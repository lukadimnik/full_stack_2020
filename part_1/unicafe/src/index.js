import React, { useState } from "react";
import ReactDOM from "react-dom";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClick = () => {
    setGood(good + 1);
  };
  const neutralClick = () => {
    setNeutral(neutral + 1);
  };
  const badClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="good" click={goodClick} />
      <Button name="neutral" click={neutralClick} />
      <Button name="bad" click={badClick} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
