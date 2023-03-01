import { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.onClick}>{props.name}</button>;
};

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.name}</td>
        <td>
          {props.value}
          {props.sufix}
        </td>
      </tr>
  );
};

const Statistics = ({ good, neutral, bad, ratings }) => {
  let sum = 0;
  ratings.forEach((i) => {
    sum = sum + i;
  });

  let average = 0;
  let positives = 0;
  if (ratings.length > 0) {
    average = sum / ratings.length;
    positives = (good / ratings.length) * 100;
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="average" value={average} />
          <StatisticLine name="positive" value={positives} sufix="%" />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [ratings, setRatings] = useState([]);

  const handleGood = () => {
    setGood(good + 1);
    setRatings(ratings.concat(1));
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setRatings(ratings.concat(0));
  };
  const handleBad = () => {
    setBad(bad + 1);
    setRatings(ratings.concat(-1));
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGood} name="good" />
      <Button onClick={handleNeutral} name="neutral" />
      <Button onClick={handleBad} name="bad" />
      {ratings.length > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} ratings={ratings} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
