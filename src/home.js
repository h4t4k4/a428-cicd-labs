import React, { useState, useEffect } from "react";

import "./App.css";
import { getPadTime } from "./helpers/getPadTime";

const Home = (props) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isCouting, setIsCouting] = useState(false);

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);

  const handleStart = () => {
    setIsCouting(true);
    if (timeLeft === 0) setTimeLeft(5);
  };
  const handleStop = () => {
    setIsCouting(false);
  };
  const handleReset = () => {
    setIsCouting(false);
    setTimeLeft(2 * 60);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      isCouting &&
        setTimeLeft((timeleft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    if (timeLeft === 0) setIsCouting(false);
    return () => {
      clearInterval(interval);
    };
  }, [isCouting, timeLeft]);
  return (
    <div className="mainContainer">

        <div className={"titleContainer"}>

            <h1>React App Timer</h1>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React logo" />
            <p>React App TImer web apps</p>

        </div>

        <div>

            This is the home page.

        </div>
    <div className="app">
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        {isCouting ? (
          <button onClick={handleStop}>Stop</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}

        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
    </div>
  );
}

export default Home;