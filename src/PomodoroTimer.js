import React, { useState } from 'react';

const PomodoroTimer = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const startTimer = () => {
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

  const stopTimer = () => {
    setIsStarted(false);
    setTimeRemaining(sessionLength * 60);
  };

  const resetTimer = () => {
    setIsStarted(false);
    setTimeRemaining(sessionLength * 60);
    setIsBreak(false);
  };

  const handleSessionLengthChange = (event) => {
    const newSessionLength = parseInt(event.target.value);
    if (newSessionLength >= 1 && newSessionLength <= 60) {
      setSessionLength(newSessionLength);
      if (!isStarted) {
        setTimeRemaining(newSessionLength * 60);
      }
    }
  };

  const handleBreakLengthChange = (event) => {
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
            <button onClick={stopTimer}>Stop</button>
          ) : (
            <button onClick={startTimer}>Start</button>
          )}
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
      <div className="timer-settings">
        <label>Session Length:</label>
        <input
          type="number"
          min="1"
          max="60"
          value={sessionLength}
          onChange={handleSessionLengthChange}
        />
        <label>Break Length:</label>
        <input
          type="number"
          min="1"
          max="60"
          value={breakLength}
          onChange={handleBreakLengthChange}
        />
      </div>
    </div>
  );
};

export default PomodoroTimer;
