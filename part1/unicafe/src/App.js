import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h2>Statistics</h2>

      {!all ? (
        <div>No feedback given</div>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={all} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive} />
          </tbody>
        </table>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (all ? (good * 100) / all : 0) + " %";

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
