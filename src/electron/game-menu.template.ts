/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/electron/index.d.ts" />
const {app, ipcMain} = require('electron');
const settings = require('electron-settings');

import { ShortCuts } from './shortcuts';
import { Application } from './application';

export class GameMenuTemplate {

    static build(application: Application): Electron.MenuItemOptions[]{

        const template: Electron.MenuItemOptions[] = [
            {
                label: 'Document',
                submenu: [
                    {
                        label: 'Nouvelle Fenetre',
                        accelerator: ShortCuts.convert(settings.getSync('option.shortcut.no-emu.new-window')),
                        click (item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
                            application.addWindow();
                        }
                    },
                    {
                        label: 'Nouveau Onglet',
                        accelerator: ShortCuts.convert(settings.getSync('option.shortcut.no-emu.new-tab')),
                        click (item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
                            focusedWindow.webContents.send('new-tab', {});
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Fermer La Fenetre',
                        accelerator: 'Shift+CmdOrCtrl+W',
                        click (item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
                            //Emulator.openGameWindow();
                            focusedWindow.close();
                        }
                    },
                    {
                        label: 'Fermer L\'Onglet',
                        accelerator: 'CmdOrCtrl+W',
                        click (item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
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
                        click (item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
                            if (focusedWindow) focusedWindow.reload()
                        }
                    },
                    {
                        label: 'Outils Developpeur',
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                        click (item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
                            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
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
                        accelerator: ShortCuts.convert(settings.getSync('option.shortcut.no-emu.prev-tab')),
                        click (item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
                            focusedWindow.webContents.send('switch-tab', 'prev');
                        }
                    },
                    {
                        label: 'Montret Onglet Suivant',
                        accelerator: ShortCuts.convert(settings.getSync('option.shortcut.no-emu.next-tab')),
                        click (item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
                            focusedWindow.webContents.send('switch-tab', 'next');
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        'label': 'Activer le son',
                        click(item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
                            focusedWindow.webContents.setAudioMuted(false);
                        }
                    },
                    {
                        'label': 'Désactiver le son',
                        click(item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
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
                label:'Paramètres',
                submenu: [
                    {
                        label: 'Options',
                        click (item: Electron.MenuItem, focusedWindow: Electron.BrowserWindow) {
                            require('./Option').init(focusedWindow)
                        }
                    }
                ]
            },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'A propos',
                        click () {
                            require('electron').shell.openExternal('')
                        }
                    }
                ]
            }
        ];

        if (process.platform === 'darwin') {
            this.darwin(template);
        }

        return template;
    }

    static darwin(template: any){
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
        })
        // Edit menu.
        template[2].submenu.push(
            {
                type: 'separator'
            },
            {
                label: 'Speech',
                submenu: [
                    {
                        role: 'startspeaking'
                    },
                    {
                        role: 'stopspeaking'
                    }
                ]
            }
        )
    }
}
