const settings = require('electron-settings');
const electron = require('electron');
const { app, Menu } = electron;

import { Application } from './application';

export class OptionWindow {

    private win: Electron.BrowserWindow;
    private application: Application;

    constructor(application: Application){
        this.application = application;
        this.win = new electron.BrowserWindow({
            width: 710,
            height: 500,
            resizable: false,
            center: true,
            parent: electron.BrowserWindow.getFocusedWindow(),
            darkTheme: true,
            skipTaskbar: true,
            show: false
        });

        this.win.on('closed', () => {
            this.win = null
        });
    }

    run(): void{
        this.win.loadURL(`file://${__dirname}/../browser/index.html#/option`);

    }

    save(): void{
        this.win.close();
        this.application.reloadSettings();
    }
}
