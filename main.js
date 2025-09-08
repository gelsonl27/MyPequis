import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let backendProcess;

function startBackend() {
  backendProcess = exec('node server.js', { cwd: path.join(__dirname, 'backend') }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erro ao iniciar backend: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Backend stderr: ${stderr}`);
    }
    console.log(`Backend: ${stdout}`);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // inicia pela tela de login
  win.loadFile(path.join(__dirname, 'frontend', 'login.html'));
  // win.webContents.openDevTools(); // opcional
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    if (backendProcess) backendProcess.kill();
    app.quit();
  }
});

