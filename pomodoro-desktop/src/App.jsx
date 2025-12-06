import { useEffect, useState, useRef } from 'react';
import './App.css';
import idleGif from './assets/idle.gif';
import workingGif from './assets/working.gif';
import breakGif from './assets/break.gif';
import ringtone from './assets/ringtone.mp3';

const WORK_TIME = 25 * 60; // 25 minutos
const BREAK_TIME = 5 * 60; // 5 minutos

const WORK_QUOTES = [
  "Focus! You're doing great!",
  "One step at a time, you got this!",
  "Productivity is your superpower",
  "Every minute counts, keep going!",
  "Your effort is worth it",
  "Focus mode activated!",
  "Making things happen",
  "Future you will thank you",
];

const BREAK_QUOTES = [
  "Time to recharge your batteries",
  "Rest up, you deserve it!",
  "Take a deep breath and relax",
  "A well-deserved break",
  "Stretch and enjoy the moment",
  "Pause for success",
  "Your brain needs this break",
  "Relax, you'll come back stronger",
];

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// Obtener una frase aleatoria según el modo
const getRandomQuote = (quoteMode) => {
  const quotes = quoteMode === "work" ? WORK_QUOTES : BREAK_QUOTES;
  return quotes[Math.floor(Math.random() * quotes.length)];
};

function App() {
  const [mode, setMode] = useState("work");
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [quote, setQuote] = useState(() => getRandomQuote("work"));
  const audioRef = useRef(new Audio(ringtone));

  // Configurar el audio para que se repita en loop
  useEffect(() => {
    audioRef.current.loop = true;
  }, []);

  // Reproducir sonido en loop
  const playBellSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(err => console.log('Error playing sound:', err));
  };

  // Detener sonido
  const stopBellSound = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // Cambiar entre WORK y BREAK
  const handleModeChange = (newMode) => {
    stopBellSound(); // Detener sonido al cambiar de modo
    setMode(newMode);
    setIsRunning(false);
    setSeconds(newMode === "work" ? WORK_TIME : BREAK_TIME);
    setQuote(getRandomQuote(newMode));
  };

  // Cambiar frase cuando inicia el timer
  useEffect(() => {
    if (isRunning) {
      setQuote(getRandomQuote(mode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  // Timer
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          // Reproducir sonido de campana
          playBellSound();
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
  }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const togglePlay = () => {
    stopBellSound(); // Detener sonido al hacer clic en cualquier botón
    if (seconds === 0) {
      // Si está en 00:00, reiniciar el timer
      setSeconds(mode === "work" ? WORK_TIME : BREAK_TIME);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  // Determinar qué GIF mostrar
  const getCurrentGif = () => {
    if (!isRunning) return idleGif; // No está corriendo = idle
    if (mode === 'work') return workingGif; // Trabajando
    if (mode === 'break') return breakGif; // Descansando
    return idleGif;
  };

  const handleClose = () => {
    stopBellSound(); // Detener sonido al cerrar
    if (window.electron && window.electron.closeWindow) {
      window.electron.closeWindow();
    }
  };

  const handleMinimize = () => {
    if (window.electron && window.electron.minimizeWindow) {
      window.electron.minimizeWindow();
    }
  };

  return (
    <div className="window">
      <div className="window-title">
        <span>WORK BUDDY♥</span>
        <div className="window-controls">
          <button className="window-minimize-btn" onClick={handleMinimize}>−</button>
          <button className="window-close-btn" onClick={handleClose}>✕</button>
        </div>
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

        <div className="motivational-quote">
          {isRunning && quote && `"${quote}"`}
        </div>

        <div className="cloud-scene">
          {/* GIF animado según el estado */}
          <img src={getCurrentGif()} alt="Pomodoro cat" className="cat-gif" />
        </div>

        <button className="play-btn" onClick={togglePlay}>
          {seconds === 0 ? "↻ Restart" : isRunning ? "Pause" : "Play"}
        </button>
        </div>
      </div>
    </div>
  );

}

export default App;