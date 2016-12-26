"use strict";
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/electron/index.d.ts" />
var settings = require('electron-settings');
var electron = require('electron');
var app = electron.app, Menu = electron.Menu;
var Option = (function () {
    function Option(application, winParent) {
        var _this = this;
        this.application = application;
        this.win = new electron.BrowserWindow({
            width: 710,
            height: 500,
            resizable: false,
            center: true,
            parent: winParent /*BrowserWindow.getFocusedWindow()*/,
            darkTheme: true,
            skipTaskbar: true,
        });
        this.win.on('closed', function () {
            _this.win = null;
        });
    }
    Option.prototype.run = function () {
        this.win.loadURL("file://" + __dirname + "/../browser/index.html/#/option");
    };
    Option.prototype.save = function () {
        this.win.close();
        this.application.reloadSettings();
    };
    return Option;
}());
exports.Option = Option;

//# sourceMappingURL=option-window.js.map
