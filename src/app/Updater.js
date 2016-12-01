const {app, dialog, shell} = require('electron');
const {BrowserWindow} = require('electron');
const http = require('http');
const path = require('path');
const os = require('os');
const fs = require('fs');
const url = require('url');
const Emulator = require('./Emulator');
const MessageBox = require('./MessageBox');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const sudo = require('sudo-prompt');

class Updater {

    static failedCheckUpdates(){
        dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
            type: 'error',
            title: 'Error',
            message: 'Impossible de vérifier les mises à jours...\nVérifiez votre connexion à Internet.',
            buttons: ['Fermer']
        },() => {
            Updater.startGame();
        });
    }

    static checkUpdate(){

        if(Emulator.options.update){
            return Updater.startGame();
        }

        let queries = '?version=' + app.getVersion() + '&os='+process.platform;
        http.get(url.resolve(Emulator.webSite, 'update/update.php' + queries), (res) => {

            if (!res || !res.statusCode || res.statusCode != 200) {

                this.failedCheckUpdates();
            } else {
                let body = '';

                // get data
                res.on('data', (chunk) => {
                    body += chunk;
                });

                // parse data
                res.on('end', () => {

                    Updater.responseBody = JSON.parse(body);

                    if (Updater.responseBody.version || Emulator.devMode) {

                        if (Updater.responseBody.version != Emulator.version /*|| Emulator.devMode*/) {

                            if (Updater.responseBody.new) {

                                dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
                                    type: 'info',
                                    title: 'Nouvelle version : ' + Updater.responseBody.version,
                                    message: 'Une nouvelle version est disponible de DofusTouchNoEmu, vous devez la télécharger depuis notre site!\n',
                                    buttons: ['Se rendre sur le site', 'Ignorer']
                                }, (buttonIndex) => {
                                    if(buttonIndex == 0){
                                        shell.openExternal("http://dofustouch.no-emu.com/#download")
                                    }else{
                                        Updater.startGame();
                                    }
                                });
                            } else {

                                switch(process.platform){
                                    case 'win32':
                                    spawn("Updater.exe", {
                                        detached: true
                                    });
                                    app.quit();
                                    break;
                                    default:
                                    dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
                                        type: 'info',
                                        title: 'Nouvelle version : ' + Updater.responseBody.version,
                                        message: 'Une nouvelle version est disponible de DofusTouchNoEmu !\n',
                                        buttons: ['Télécharger', 'Ignorer']
                                    }, (buttonIndex) => {
                                        if(buttonIndex == 0){
                                            Updater.startUpdate();
                                        }else{
                                            Updater.startGame();
                                        }
                                    });
                                }
                            }
                        }else{
                            Updater.startGame();
                        }
                    } else {
                        this.failedCheckUpdates();
                    }
                });
            }
        }).on('error', this.failedCheckUpdates);
    }

    static execUpdate(){

        var options = {
            name: 'DofusTouchNE',
        };

        exec('chmod a+x '+app.getAppPath()+'/update.sh', function(error, stdout, stderr) {
            sudo.exec(app.getAppPath()+'/update.sh '+app.getAppPath(), options, function(error, stdout, stderr) {
                let args = process.argv.slice(1).concat(['--relaunch', '-l']);
                app.relaunch({args: args});
                app.exit(0);
            });
        });

    }

    static startUpdate () {

        Updater.toSaveFilePath = app.getAppPath()+'/update.tar.gz';

        var winUpdate = new BrowserWindow({
            width: 700,
            height: 150,
            resizable: false,
            center: true,
            parent: BrowserWindow.getFocusedWindow(),
        });

        winUpdate.on('closed', () => {
            winUpdate = null
        });

        winUpdate.loadURL(Emulator.dirView('updater.html'));

        if (Emulator.devMode){
            winUpdate.webContents.openDevTools();
        }

    }

    static changeLog(){
        var winChangeLog = new BrowserWindow({
            width: 500,
            height: 600,
            resizable: false,
            center: true,
            parent: BrowserWindow.getFocusedWindow(),
        });

        winChangeLog.on('closed', () => {
            winChangeLog = null
        });


        winChangeLog.loadURL(Emulator.dirView('changelog.html'));
    }

    static init (startGame) {
        Updater.startGame = startGame;
        
        if(Emulator.options.changelog){
            startGame();
            return Updater.changeLog();
        }

        this.checkUpdate();
    }
}

module.exports = Updater;
