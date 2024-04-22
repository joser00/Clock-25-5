import React from "react";
export default function App() {
  const [minutsSession, setMinutsSession] = React.useState(25);
  const [minutsBreak, setMinutsBreak] = React.useState(5);
  const [selectedTimeSession, setSelectedTimeSession] = React.useState(25);
  const [selectedTimeBreak, setSelectedTimeBreak] = React.useState(5);
  const [decimals, setDecimals] = React.useState(60);
  const [running, setRunning] = React.useState(false);
  const [breakIn, setBreakIn] = React.useState(false);
  const [audio, setAudio] = React.useState(false);

  function flipValue() {
    setRunning((oldValue) => {
      return !oldValue;
    });
  }
  React.useEffect(() => {
    let intervalId;
    if (running === true) {
      if (!breakIn) {
        if (decimals >= 0) {
          intervalId = setInterval(() => {
            setDecimals((oldValue) => oldValue - 1);
            if (decimals === 60) {
              setSelectedTimeSession(selectedTimeSession - 1);
            } else if (decimals === 0) {
              setDecimals(60);
            }
            if (decimals === 0 && selectedTimeSession === 0) {
              setSelectedTimeSession(minutsSession);
              setAudio(true);
              setBreakIn((oldValue) => !oldValue);
            }
          }, 1000);
        }
      } else {
        if (decimals >= 0) {
          intervalId = setInterval(() => {
            setDecimals((oldValue) => oldValue - 1);
            if (decimals === 60) {
              setSelectedTimeBreak(selectedTimeBreak - 1);
            } else if (decimals === 0) {
              setDecimals(60);
            }
            if (decimals === 0 && selectedTimeBreak === 0) {
              setSelectedTimeBreak(minutsBreak);
              setAudio(true);
              setBreakIn((oldValue) => !oldValue);
            }
          }, 1000);
        }
      }
    } else if (running === false) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar o al cambiar 'running'
  }, [
    running,
    decimals,
    selectedTimeSession,
    breakIn,
    selectedTimeBreak,
    minutsBreak,
    minutsSession,
  ]);
  /* Fin useEffect */
  function handleTimerSession(e) {
    const { id } = e.target;
    if (minutsSession < 60 && minutsSession > 1) {
      if (id === "session-increment") {
        setMinutsSession(minutsSession + 1);
        setSelectedTimeSession(selectedTimeSession + 1);
        /*  setDecimals(0) */
      }
      if (id === "session-decrement") {
        setMinutsSession(minutsSession - 1);
        setSelectedTimeSession(selectedTimeSession - 1);
        /*  setDecimals(0) */
      }
    } else if (minutsSession === 60) {
      if (id === "session-decrement") {
        setMinutsSession(minutsSession - 1);
        setSelectedTimeSession(selectedTimeSession - 1);
        /*  setDecimals(0) */
      }
    } else if (minutsSession === 1) {
      if (id === "session-increment") {
        setMinutsSession(minutsSession + 1);
        setSelectedTimeSession(selectedTimeSession + 1);
        /*  setDecimals(0) */
      }
    }
  }
  /* Fin handleTimerSession */
  function handleTimerBreak(e) {
    const { id } = e.target;
    if (minutsBreak < 60 && minutsBreak > 1) {
      if (id === "break-increment") {
        setMinutsBreak(minutsBreak + 1);
        setSelectedTimeBreak(selectedTimeBreak + 1);
        /*  setDecimals(0) */
      }
      if (id === "break-decrement") {
        setMinutsBreak(minutsBreak - 1);
        setSelectedTimeBreak(selectedTimeBreak - 1);
        /*  setDecimals(0) */
      }
    } else if (minutsBreak === 60) {
      if (id === "break-decrement") {
        setMinutsBreak(minutsBreak - 1);
        setSelectedTimeBreak(selectedTimeBreak - 1);
        /*  setDecimals(0) */
      }
    } else if (minutsBreak === 1) {
      if (id === "break-increment") {
        setMinutsBreak(minutsBreak + 1);
        setSelectedTimeBreak(selectedTimeBreak + 1);
        /*  setDecimals(0) */
      }
    }
  }
  /*  */
  function resetValues() {
    setSelectedTimeBreak(5);
    setSelectedTimeSession(25);
    setMinutsBreak(5);
    setMinutsSession(25);
    setDecimals(0);
    setRunning(false);
    setBreakIn(false);
    setAudio(false);
  }
  /* Fin handleTimerBreak */
  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <div className="handle-container">
        <div className="break-container">
          <h2 id="break-label">Break Length</h2>
          <i
            className="fa-solid fa-arrow-up"
            disabled={running}
            id="break-increment"
            onClick={handleTimerBreak}
          ></i>
          <input
            type="number"
            name="break-label"
            id="break-length"
            className="hide-arrows"
            value={minutsBreak}
            min={0}
            max={60}
          />
          <i
            className="fa-solid fa-arrow-down"
            disabled={running}
            id="break-decrement"
            onClick={handleTimerBreak}
          ></i>
        </div>
        {/* Ends of the break container */}

        <div className="session-container">
          <h2 id="session-label">Session Length</h2>
          <i
            className="fa-solid fa-arrow-up"
            disabled={running}
            id="session-increment"
            onClick={handleTimerSession}
          ></i>
          <input
            type="number"
            name="session-label"
            id="session-length"
            className="hide-arrows"
            value={minutsSession}
            min={0}
            max={60}
          />
          <i
            className="fa-solid fa-arrow-down"
            disabled={running}
            id="session-decrement"
            onClick={handleTimerSession}
          ></i>
        </div>
      </div>

      {/* Ends of the session container */}

      <div className="display-container">
        <h1 id="timer-label">{breakIn ? "Break" : "Session"}</h1>
        <h2 id="time-left" style={{ color: decimals < 9 && selectedTimeBreak === 0 ? "red" : decimals < 9 && selectedTimeSession === 0 ? "red" : 'black'}}>
          {breakIn ? selectedTimeBreak : selectedTimeSession}:
          {decimals === 60 ? "00" : decimals < 10 ? `0${decimals}` : decimals}
        </h2>
        <div className="button-handle-time">
          <i
            className="fa-solid fa-forward-step"
            id="start_stop"
            onClick={flipValue}
          ></i>
          <i
            id="reset"
            className="fa-solid fa-repeat"
            onClick={resetValues}
          ></i>
        </div>
        {audio && <audio id = "beep" autoPlay src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" onEnded={() => setAudio(false)}></audio>}
      </div>
    </div>
  );
}
