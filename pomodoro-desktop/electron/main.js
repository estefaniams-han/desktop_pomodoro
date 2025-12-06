const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 490,
    height: 530,
    resizable: false,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 👉 PARA DESARROLLO: Cargar el server de Vite
  win.loadURL("http://localhost:5173");

  // Abre DevTools para ver errores de consola si algo falla
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Manejar el evento de cerrar ventana
ipcMain.on("close-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
