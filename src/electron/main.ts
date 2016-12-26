/// <reference path="../../node_modules/@types/node/index.d.ts" />
const electron = require('electron');

import {Application} from './application';

// Define App
const app = electron.app;

// Ignore black list GPU for WebGL
app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true');

// Disable backgrounding renderer
app.commandLine.appendSwitch("disable-renderer-backgrounding");

let application: Application = null;

app.on('ready', () => {

    // Singleton
    if(!application){
        application = new Application();
    }

    application.run();
});

app.on('window-all-closed', function() {
    process.platform;
    //if (process.platform !== 'darwin') {
        app.quit();
    //}
});

/*app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});*/
