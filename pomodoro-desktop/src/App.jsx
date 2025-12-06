import { useEffect, useState } from 'react';
import './App.css';
import idleGif from './assets/idle.gif';
import workingGif from './assets/working.gif';
import breakGif from './assets/break.gif';

const WORK_TIME = 25 * 60; // 25 minutos
const BREAK_TIME = 5 * 60; // 5 minutos

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function App() {
  const [mode, setMode] = useState("work");
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);

  // Cambiar entre WORK y BREAK
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setSeconds(newMode === "work" ? WORK_TIME : BREAK_TIME);
  };

  // Timer
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          // aquí prodría reproducir un sonido o notificación
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
  }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const togglePlay = () => setIsRunning((prev) => !prev);

  // Determinar qué GIF mostrar
  const getCurrentGif = () => {
    if (!isRunning) return idleGif; // No está corriendo = idle
    if (mode === 'work') return workingGif; // Trabajando
    if (mode === 'break') return breakGif; // Descansando
    return idleGif;
  };

  const handleClose = () => {
    if (window.electron && window.electron.closeWindow) {
      window.electron.closeWindow();
    }
  };

  return (
    <div className="window">
      <div className="window-title">
        <span>WORK FASTER♥</span>
        <button className="window-close-outer" onClick={handleClose}>✕</button>
      </div>
      <div className="window-content">
        <div className="window-body">
        <div className="mode-switch">
          <button
            className={`mode-btn ${mode === "work" ? "active-work" : ""}`}
            onClick={() => handleModeChange("work")}
          >
            Work
          </button>
          <button
            className={`mode-btn ${mode === "break" ? "active-break" : ""}`}
            onClick={() => handleModeChange("break")}
          >
            Break
          </button>
        </div>

        <div className="timer">{formatTime(seconds)}</div>

        <div className="cloud-scene">
          {/* GIF animado según el estado */}
          <img src={getCurrentGif()} alt="Pomodoro cat" className="cat-gif" />
        </div>

        <button className="play-btn" onClick={togglePlay}>
          {isRunning ? "Pause" : "Play"}
        </button>
        </div>
      </div>
    </div>
  );

}

export default App;