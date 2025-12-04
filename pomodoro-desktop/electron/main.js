const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 420,
    height: 480,
    resizable: false,
    titleBarStyle: "hiddenInset",
    backgroundColor: "#f9c6dd",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
