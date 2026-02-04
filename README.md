# Work Buddy - Pomodoro Desktop App 🐾💻

An adorable and functional Pomodoro desktop app built with Electron, React, and Vite. Work Buddy helps you stay productive using the Pomodoro technique, all while being accompanied by an animated fox and bunny that changes states based on your activity. It's like having a little buddy with you to keep you focused and motivated!

<img width="952" height="1060" alt="image" src="https://github.com/user-attachments/assets/7db6fd22-e12f-4336-8c2a-49e6604dd56c" />


## Key Features

### Pomodoro Timer
- **Work Mode**: 25 minutes of laser-focused concentration 
- **Break Mode**: 5 minutes of sweet, well-deserved rest 
- Timer with MM:SS format to keep things neat and clear
- Play/Pause buttons to control the timer (you got this, no stress!)
- Restart button to reset the timer when you finish 

### Interactive Interface
- **Custom frameless window**: Sleek, clean design with your own custom window controls (minimize and close)
- **Transparent window**: Modern, minimal, and oh-so-aesthetic
- **Draggable window**: Place the app wherever feels best on your screen (freedom!)
- **Dynamic GIFs**: An animated fox & bunny that changes depending on the mode:
  - `idle.gif`: When the timer is paused (chill time)
  - `working.gif`: During active work mode (let’s hustle!)
  - `break.gif`: When it's time to take a break (you earned it)

### Motivation and Notifications 
- **Random motivational quotes**:
  - 8 unique quotes for work mode (e.g., "Focus! You're doing great!", "Productivity is your superpower")
  - 8 unique quotes for break mode (e.g., "Time to recharge your batteries", "Rest up, you deserve it!")
  - Quotes change randomly each time you start the timer (because variety is the spice of life!)
- **Sound notification**: A bell tone rings when the timer finishes (get ready to jump into the next task!)
  - Automatically stops when:
    - Switching modes (Work/Break)
    - Pressing Play/Pause/Restart
    - Closing the application

## Technologies Used

### Frontend
- **React 19.2.0**
- **React DOM 19.2.0**

### Desktop Framework
- **Electron 39.2.5**:
  - `BrowserWindow`: For window management
  - `ipcMain` & `ipcRenderer`: For smooth communication
  - `contextBridge`: To keep things secure and isolated!

### Build Tools
- **Vite 7.2.4**:
  - Hot Module Replacement (HMR)
  - Official React plugin to make sure everything flows smoothly

### Linting
- **ESLint 9.39.1**:
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh
  - @eslint/js

### Type Definitions
- @types/react 19.2.5
- @types/react-dom 19.2.3

## Prerequisites

Before you can start your journey with Work Buddy, make sure you have the following:

- **Node.js**: Version 16 or higher (18+ recommended)
- **npm**: Comes with Node.js (version 7 or higher)
- **Operating System**:
  - macOS 10.13 or higher
  - Windows 10 or higher
  - Linux (modern distributions)

## Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd desktop_pomodoro
```

### 2. Install dependencies
```bash
npm install
```

This will install all necessary dependencies specified in `package.json`.

## Available Scripts

### Development

#### Start Vite development server
```bash
npm run dev
```
- Starts Vite in development mode
- Server available at `http://localhost:5173`
- Hot Module Replacement (HMR) enabled
- Useful for developing just the React part without Electron

#### Run Electron application
```bash
npm run electron
```
- Runs Electron with current files (requires prior build)

#### Development with Electron (Recommended)
```bash
npm run electron:dev
```
- Compiles the project with Vite
- Starts the Electron application
- Opens Developer Tools automatically
- **Use this command for active development**

### Production

#### Build web application
```bash
npm run build
```
- Compiles React application for production
- Optimizes and minifies code
- Output in `dist/` folder

#### Create cross-platform distribution
```bash
npm run dist
```
- Compiles the application
- Creates installers for current platform
- Output in `release/` folder

#### Create macOS distribution
```bash
npm run dist:mac
```
- Generates DMG file (disk image)
- Generates ZIP file
- Only works on macOS

#### Create Windows distribution
```bash
npm run dist:win
```
- Generates NSIS installer
- Generates portable version
- Requires wine on non-Windows systems

### Linting and Code Quality

```bash
npm run lint
```
- Runs ESLint on entire project
- Checks for errors and warnings
- Applies React Hooks and React Refresh rules

```bash
npm run preview
```
- Previews production build locally

## Project Structure

```
desktop_pomodoro/
├── electron/
│   ├── main.js           # Electron main process
│   └── preload.js        # Preload script with Context Bridge
├── src/
│   ├── assets/
│   │   ├── idle.gif      # Cat GIF at rest
│   │   ├── working.gif   # Cat GIF working
│   │   ├── break.gif     # Cat GIF on break
│   │   ├── ringtone.mp3  # Notification sound
│   │   └── react.svg     # React logo
│   ├── App.jsx           # Main React component
│   ├── App.css           # App component styles
│   ├── index.css         # Global styles
│   └── main.jsx          # React entry point
├── public/
│   └── vite.svg          # Favicon
├── index.html            # Main HTML file
├── package.json          # Project configuration and dependencies
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── README.md             # This file
```

## Technical Details

### Electron Configuration

#### Main Window (electron/main.js)
```javascript
{
  width: 490,              // Fixed width
  height: 530,             // Fixed height
  resizable: false,        // Not resizable
  frame: false,            // No native frame
  transparent: true,       // Transparent window
  backgroundColor: "#00000000" // Fully transparent background
}
```

#### Security (electron/preload.js)
- **Context Isolation**: Enabled for enhanced security
- **Node Integration**: Disabled in renderer
- **Context Bridge**: Exposes only necessary APIs:
  - `closeWindow()`: Closes the window
  - `minimizeWindow()`: Minimizes the window

### Build Configuration (package.json)

```json
{
  "appId": "com.pomodoro.workbuddy",
  "productName": "Work Buddy",
  "directories": {
    "output": "release"
  },
  "mac": {
    "category": "public.app-category.productivity",
    "target": ["dmg", "zip"]
  },
  "win": {
    "target": ["nsis", "portable"]
  }
}
```

### React Components

#### Main State (App.jsx)
- `mode`: Current mode ('work' | 'break')
- `seconds`: Remaining seconds on timer
- `isRunning`: Whether the timer is active
- `quote`: Current motivational quote
- `audioRef`: Reference to audio element

#### Main Functions
- `formatTime(seconds)`: Converts seconds to MM:SS format
- `getRandomQuote(quoteMode)`: Gets a random quote based on mode
- `playBellSound()`: Plays notification sound in loop
- `stopBellSound()`: Stops notification sound
- `handleModeChange(newMode)`: Switches between work and break mode
- `togglePlay()`: Starts/pauses the timer
- `getCurrentGif()`: Determines which GIF to display based on state

### Time Constants

```javascript
const WORK_TIME = 25 * 60;  // 1500 seconds (25 minutes)
const BREAK_TIME = 5 * 60;   // 300 seconds (5 minutes)
```

## Customization

### Change Pomodoro Times

Edit constants in `src/App.jsx`:

```javascript
const WORK_TIME = 25 * 60; // Change 25 to desired minutes
const BREAK_TIME = 5 * 60; // Change 5 to desired minutes
```

### Add Motivational Quotes

Edit arrays in `src/App.jsx`:

```javascript
const WORK_QUOTES = [
  "Your new quote here",
  // ... more quotes
];

const BREAK_QUOTES = [
  "Your new break quote here",
  // ... more quotes
];
```

### Change Animated GIFs

Replace files in `src/assets/`:
- `idle.gif`: GIF when paused
- `working.gif`: GIF during work
- `break.gif`: GIF during break

**Note**: Keep the same filenames or update imports in `App.jsx`.

### Change Notification Sound

Replace `src/assets/ringtone.mp3` with your preferred audio (keep the same name or update import).

### Modify Window Size

Edit `electron/main.js`:

```javascript
const win = new BrowserWindow({
  width: 490,  // Change width
  height: 530, // Change height
  // ...
});
```

## Security Features

1. **Context Isolation**: Prevents direct access to Node.js process from renderer
2. **Node Integration Disabled**: Avoids use of Node.js APIs in frontend
3. **Context Bridge**: Only exposes specific and controlled APIs
4. **No Remote Module**: Doesn't use the remote module (deprecated and dangerous)

## Common Issues and Solutions

### Application doesn't start in development

**Solution**:
```bash
# Make sure to compile before running electron
npm run electron:dev
```

### Sound doesn't play

**Issue**: Some browsers/Electron require user interaction
**Solution**: Code already handles this with `.catch()`. Verify the MP3 file exists in `src/assets/`.

### Window is not draggable

**Solution**: Add `-webkit-app-region: drag` in your CSS for the area you want draggable:

```css
.window-title {
  -webkit-app-region: drag;
}

/* For buttons inside draggable area */
.window-controls button {
  -webkit-app-region: no-drag;
}
```

### Error compiling for another platform

**macOS → Windows**: Requires wine
```bash
brew install wine
```

**Windows → macOS**: Not possible without a real Mac or VM

## Future Roadmap

Possible future improvements:
- [ ] Customizable times from UI
- [ ] History of completed sessions
- [ ] Productivity statistics
- [ ] Multiple color themes
- [ ] Support for multiple tasks/projects
- [ ] Calendar integration
- [ ] Operating system notifications
- [ ] Customizable sounds
- [ ] Dark/light mode
- [ ] Keyboard shortcuts

## License

This project is for personal use.

## Author

**Estefania Marmolejo**

## Acknowledgments

- Pomodoro Technique by Francesco Cirillo
- React Team for the excellent library
- Electron Team for making desktop apps possible with web tech
- Vite for the blazing fast build tool
