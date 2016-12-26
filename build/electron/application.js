"use strict";
var settings = require('electron-settings');
var app = require('electron').app;
var default_settings_1 = require("./default.settings");
var game_window_1 = require("./game-window");
var Application = (function () {
    function Application() {
        this.website = "http://dofustouch.no-emu.com";
        this.devMode = false;
        this.gameWindows = [];
        settings.defaults(default_settings_1.DefaultSettings);
        this.devMode = true /*settings.getSync('option.general.developer-mode')*/;
    }
    Application.prototype.run = function () {
        this.addWindow();
    };
    Application.prototype.reloadSettings = function () {
        // re bind shortcuts per game window
        this.gameWindows.forEach(function (gWindow) {
            gWindow.shortCuts.reload();
        });
        // reload main menu
    };
    Application.prototype.addWindow = function () {
        var _this = this;
        // instance window game
        var gWindow = new game_window_1.GameWindow(this);
        // start the game window
        gWindow.run();
        // add event listenner closed
        gWindow.closed(function (e) {
            delete _this.gameWindows[_this.gameWindows.indexOf(e)];
        });
        // add the game window
        this.gameWindows.push(gWindow);
    };
    return Application;
}());
exports.Application = Application;

//# sourceMappingURL=application.js.map
