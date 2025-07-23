const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  minimizar: () => ipcRenderer.send('minimize-window'),
  cerrar: () => ipcRenderer.send('close-window'),
});
