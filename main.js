const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 530,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    }
  });

  win.loadFile('index.html');

  ipcMain.on('close-window', () => {
    win.close();
  });

  ipcMain.on('minimize-window', () => {
    win.minimize();
  });
}

app.whenReady().then(createWindow);
