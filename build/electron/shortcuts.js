/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/electron/index.d.ts" />
"use strict";
var electronLocalshortcut = require('electron-localshortcut');
var settings = require('electron-settings');
var app = require('electron').app;
var async = require('async');
var ShortCuts = (function () {
    function ShortCuts(win) {
        this.win = win;
        this.isBinded = false;
    }
    ShortCuts.prototype.bind = function () {
        var _this = this;
        async.forEachOf(settings.getSync('option.shortcut.no-emu.tabs'), function (shortcut, index) {
            if (shortcut) {
                electronLocalshortcut.register(_this.win, ShortCuts.convert(shortcut), function () {
                    _this.win.webContents.send('switch-tab', index);
                });
            }
        });
    };
    ShortCuts.prototype.reload = function () {
        console.log('reload shortcuts');
        // remove all bind
        electronLocalshortcut.unregisterAll(this.win);
        // bind again
        this.bind();
        // send IPC to the client
        this.win.webContents.send('reload-shortcuts');
    };
    ShortCuts.prototype.enable = function () {
        if (!this.isBinded) {
            this.bind();
        }
        else {
            electronLocalshortcut.enableAll(this.win);
        }
    };
    ShortCuts.prototype.disable = function () {
        electronLocalshortcut.disableAll(this.win);
    };
    ShortCuts.convert = function (shortcut) {
        shortcut = shortcut.replace('ctrl', 'CmdOrCtrl');
        return shortcut;
    };
    return ShortCuts;
}());
exports.ShortCuts = ShortCuts;

//# sourceMappingURL=shortcuts.js.map
