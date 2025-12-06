// Aquí se pueden exponer APIs seguras al renderer
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  closeWindow: () => ipcRenderer.send("close-window"),
});
