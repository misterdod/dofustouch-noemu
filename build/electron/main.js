"use strict";
/// <reference path="../../node_modules/@types/node/index.d.ts" />
var electron = require('electron');
var application_1 = require("./application");
// Define App
var app = electron.app;
// Ignore black list GPU for WebGL
app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true');
// Disable backgrounding renderer
app.commandLine.appendSwitch("disable-renderer-backgrounding");
var application = null;
app.on('ready', function () {
    // Singleton
    if (!application) {
        application = new application_1.Application();
    }
    application.run();
});
app.on('window-all-closed', function () {
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

//# sourceMappingURL=main.js.map
