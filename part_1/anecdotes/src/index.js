import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(6 + 1)
      .join("0")
      .split("")
      .map(parseFloat)
  );

  const randomize = () => {
    let random = Math.floor(Math.random() * 5 + 1);
    setSelected(random);
  };

  const voting = selected => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Number of votes: {votes[selected]}</p>
      <button onClick={randomize}>next anecdote</button>
      <button onClick={() => voting(selected)}>vote</button>
      <h1>Anecdote with most votes</h1>
      <table id="anecdoteTable">
        <tbody>
          <tr>
            <td>An_1: {votes[0]}</td>
            <td>An_2: {votes[1]}</td>
            <td>An_3: {votes[2]}</td>
            <td>An_4: {votes[3]}</td>
            <td>An_5: {votes[4]}</td>
            <td>
              An_6:
              {votes[5]}
            </td>
          </tr>
        </tbody>
      </table>
      <p>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>Has: {Math.max(...votes)}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
