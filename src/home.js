import React, { useState } from 'react';

const Home = () => {
  const [sessionLength, setSessionLength] = useState(25); // Session duration in minutes
  const [breakLength, setBreakLength] = useState(5); // Break duration in minutes
  const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60); // Time in seconds
  const [isStarted, setIsStarted] = useState(false); // Indicates timer status
  const [isBreak, setIsBreak] = useState(false); // Indicates break mode

  const handleStart = () => {
    setIsStarted(true);
    const intervalId = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        clearInterval(intervalId);
        if (isBreak) {
          setIsBreak(false);
          setTimeRemaining(sessionLength * 60);
        } else {
          setIsBreak(true);
          setTimeRemaining(breakLength * 60);
        }
      }
    }, 1000);
  };

  const handleStop = () => {
    setIsStarted(false);
    setTimeRemaining(sessionLength * 60);
  };

  const handleReset = () => {
    setIsStarted(false);
    setTimeRemaining(sessionLength * 60);
    setIsBreak(false);
  };

  const handleSessionChange = (event) => {
    const newSessionLength = parseInt(event.target.value);
    if (newSessionLength >= 1 && newSessionLength <= 60) {
      setSessionLength(newSessionLength);
      if (!isStarted) {
        setTimeRemaining(newSessionLength * 60);
      }
    }
  };

  const handleBreakChange = (event) => {
    const newBreakLength = parseInt(event.target.value);
    if (newBreakLength >= 1 && newBreakLength <= 60) {
      setBreakLength(newBreakLength);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="pomodoro-timer">
      <h1>Pomodoro Timer</h1>
      <div className="timer-controls">
        <div className="timer-status">
          {isBreak ? 'Break' : 'Session'}
        </div>
        <div className="timer-display">
          {formatTime(timeRemaining)}
        </div>
        <div className="timer-buttons">
          {isStarted ? (
            <button onClick={handleStop}>Stop</button>
          ) : (
            <button onClick={handleStart}>Start</button>
          )}
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className="timer-settings">
        <label>Session Length:</label>
        <input
          type="number"
          min="1"
          max="60"
          value={sessionLength}
          onChange={handleSessionChange}
        />
        <label>Break Length:</label>
        <input
          type="number"
          min="1"
          max="60"
          value={breakLength}
          onChange={handleBreakChange}
        />
      </div>
    </div>
  );
};

export default Home;