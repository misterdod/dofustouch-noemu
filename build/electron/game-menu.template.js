"use strict";
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/electron/index.d.ts" />
var _a = require('electron'), app = _a.app, ipcMain = _a.ipcMain;
var settings = require('electron-settings');
var shortcuts_1 = require("./shortcuts");
var GameMenuTemplate = (function () {
    function GameMenuTemplate() {
    }
    GameMenuTemplate.build = function (application) {
        var template = [
            {
                label: 'Document',
                submenu: [
                    {
                        label: 'Nouvelle Fenetre',
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcut.no-emu.new-window')),
                        click: function (item, focusedWindow) {
                            application.addWindow();
                        }
                    },
                    {
                        label: 'Nouveau Onglet',
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcut.no-emu.new-tab')),
                        click: function (item, focusedWindow) {
                            focusedWindow.webContents.send('new-tab', {});
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Fermer La Fenetre',
                        accelerator: 'Shift+CmdOrCtrl+W',
                        click: function (item, focusedWindow) {
                            //Emulator.openGameWindow();
                            focusedWindow.close();
                        }
                    },
                    {
                        label: 'Fermer L\'Onglet',
                        accelerator: 'CmdOrCtrl+W',
                        click: function (item, focusedWindow) {
                            focusedWindow.webContents.send('close-tab', {});
                        }
                    },
                ]
            },
            {
                label: 'Edition',
                submenu: [
                    {
                        role: 'undo'
                    },
                    {
                        role: 'redo'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'cut'
                    },
                    {
                        role: 'copy'
                    },
                    {
                        role: 'paste'
                    },
                    {
                        role: 'delete'
                    },
                    {
                        role: 'selectall'
                    }
                ]
            },
            {
                label: 'Vue',
                submenu: [
                    {
                        label: 'Recharger',
                        accelerator: 'CmdOrCtrl+R',
                        click: function (item, focusedWindow) {
                            if (focusedWindow)
                                focusedWindow.reload();
                        }
                    },
                    {
                        label: 'Toggle Developer Tools',
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                        click: function (item, focusedWindow) {
                            if (focusedWindow)
                                focusedWindow.webContents.toggleDevTools();
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Réinitialiser le zoom',
                        role: 'resetzoom'
                    },
                    {
                        label: 'Zoom +',
                        role: 'zoomin'
                    },
                    {
                        label: 'Zoom -',
                        role: 'zoomout'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Mode Plein Écran',
                        role: 'togglefullscreen'
                    }
                ]
            },
            {
                label: 'Fenetre',
                submenu: [
                    {
                        label: 'Montret Onglet Précédent',
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcut.no-emu.prev-tab')),
                        click: function (item, focusedWindow) {
                            focusedWindow.webContents.send('switch-tab', 'prev');
                        }
                    },
                    {
                        label: 'Montret Onglet Suivant',
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcut.no-emu.next-tab')),
                        click: function (item, focusedWindow) {
                            focusedWindow.webContents.send('switch-tab', 'next');
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        'label': 'Activer le son',
                        click: function (item, focusedWindow) {
                            focusedWindow.webContents.setAudioMuted(false);
                        }
                    },
                    {
                        'label': 'Désactiver le son',
                        click: function (item, focusedWindow) {
                            focusedWindow.webContents.setAudioMuted(true);
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'minimize'
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                label: 'Paramètres',
                submenu: [
                    {
                        label: 'Options',
                        click: function (item, focusedWindow) {
                            require('./Option').init(focusedWindow);
                        }
                    }
                ]
            },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'A propos',
                        click: function () {
                            require('electron').shell.openExternal('');
                        }
                    }
                ]
            }
        ];
        if (process.platform === 'darwin') {
            this.darwin(template);
        }
        return template;
    };
    GameMenuTemplate.darwin = function (template) {
        template.unshift({
            label: app.getName(),
            submenu: [
                {
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideothers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        });
        // Edit menu.
        template[2].submenu.push({
            type: 'separator'
        }, {
            label: 'Speech',
            submenu: [
                {
                    role: 'startspeaking'
                },
                {
                    role: 'stopspeaking'
                }
            ]
        });
    };
    return GameMenuTemplate;
}());
exports.GameMenuTemplate = GameMenuTemplate;

//# sourceMappingURL=game-menu.template.js.map
