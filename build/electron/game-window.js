"use strict";
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/electron/index.d.ts" />
var settings = require('electron-settings');
var electron = require('electron');
var app = electron.app, Menu = electron.Menu;
var shortcuts_1 = require("./shortcuts");
var game_menu_template_1 = require("./game-menu.template");
var GameWindow = (function () {
    function GameWindow(application) {
        this.devMode = false;
        this.application = application;
        this.devMode = settings.getSync('option.general.developer-mode');
        this.win = new electron.BrowserWindow({
            width: parseInt(settings.getSync('option.general.resolution').split(';')[0]),
            height: parseInt(settings.getSync('option.general.resolution').split(';')[1]),
            title: 'DofusTouch-NE',
            useContentSize: true,
            center: true,
            webPreferences: {
                backgroundThrottling: false
            }
        });
        this.shortCuts = new shortcuts_1.ShortCuts(this.win);
        this.menu = Menu.buildFromTemplate(game_menu_template_1.GameMenuTemplate.build(this.application));
    }
    GameWindow.prototype.run = function () {
        // load the app
        this.win.loadURL("file://" + __dirname + "/../browser/index.html", { userAgent: this.generateUA() });
        // set menu
        Menu.setApplicationMenu(this.menu);
        // bind shortcuts
        this.shortCuts.enable();
        if (this.devMode) {
            this.win.webContents.openDevTools();
        }
    };
    GameWindow.prototype.generateUA = function () {
        return "";
    };
    GameWindow.prototype.closed = function (cb) {
        var _this = this;
        this.win.on('closed', function () {
            _this.win = null;
            cb(_this);
        });
    };
    return GameWindow;
}());
exports.GameWindow = GameWindow;

//# sourceMappingURL=game-window.js.map
