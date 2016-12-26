/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/electron/index.d.ts" />
const settings = require('electron-settings');
const electron = require('electron');
const { app, Menu } = electron;

import { Application } from './application';

export class Option {

    private win: Electron.BrowserWindow;
    private application: Application;

    constructor(application: Application, winParent: Electron.BrowserWindow){
        this.application = application;
        this.win = new electron.BrowserWindow({
            width: 710,
            height: 500,
            resizable: false,
            center: true,
            parent: winParent/*BrowserWindow.getFocusedWindow()*/,
            darkTheme: true,
            skipTaskbar: true,
        });

        this.win.on('closed', () => {
            this.win = null
        });
    }

    run(): void{
        this.win.loadURL(`file://${__dirname}/../browser/index.html/#/option`);
    }

    save(): void{
        this.win.close();
        this.application.reloadSettings();
    }
}
