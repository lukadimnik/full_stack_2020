import React from "react";
import Statistic from "./Statistic";

const Statistics = props => {
  if (props.good !== 0 || props.neutral !== 0 || props.bad !== 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text={"Good"} value={props.good} />
            <Statistic text={"Neutral"} value={props.neutral} />

            <Statistic text={"Bad"} value={props.bad} />

            <Statistic
              text={"All"}
              value={props.good + props.neutral + props.bad}
            />
            <Statistic
              text={"Average"}
              value={
                (1 * props.good + 0 * props.neutral + -1 * props.bad) /
                (props.good + props.neutral + props.bad)
              }
            />
            <Statistic
              text={"Positive"}
              value={`${(props.good * 100) /
                (props.good + props.neutral + props.bad)} %`}
            />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
};

export default Statistics;
