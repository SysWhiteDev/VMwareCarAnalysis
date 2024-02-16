const { app } = require('electron');
const { exec } = require('child_process');
const { BrowserWindow } = require('electron');

// Start the Docker container
exec('docker run -d -p 6980:3000 testing', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error starting Docker container: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Docker error: ${stderr}`);
        return;
    }
    console.log(`Docker container started successfully. Container ID: ${stdout}`);
});

function createWindow(){
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.menuBarVisible = false;
    win.fullScreen = true;

    // win.loadURL('http://localhost:6980');
    win.loadFile("./pages/bind/index.html");
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
