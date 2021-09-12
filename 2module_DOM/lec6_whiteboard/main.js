const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800, height: 60, webPreferences: { nodeIntegration: true }
    });

    mainWindow.loadFile('index.html').then(() => {
        mainWindow.webContents.openDevTools();
        mainWindow.maximize();
        mainWindow.removeMenu();    // removes menu
    })
}

app.whenReady().then(() => {
    createWindow();
})