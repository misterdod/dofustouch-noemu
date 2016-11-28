const electronLocalshortcut = require('electron-localshortcut');
const async = require('async');
const settings = require('electron-settings');
const {app} = require('electron');

const Emulator = require('./Emulator');

class ShortCuts {

    constructor(win){
        this.win = win;
        this.start = false;
    }

    init(){
        // tabs
        async.forEachOf(settings.getSync('option.shortcut.no-emu.tabs'), (shortcut, index, callback) => {
            if(shortcut){
                electronLocalshortcut.register(this.win, ShortCuts.convert(shortcut), (e) => {
                    this.win.webContents.send('switchTab', index);
                });
            }
            callback();
        });
    }

    reload(){
        console.log('reload shortcuts');

        // reload shortcuts
        electronLocalshortcut.unregisterAll(this.win);
        this.init();

        // reload tab shortcuts
        this.win.webContents.send('reloadShotcuts');
    }

    enable(){
        if(!this.start){
            this.init()
        }else{
            electronLocalshortcut.enableAll(this.win);
        }
    }

    disable(){
        electronLocalshortcut.disableAll(this.win);
    }

    static convert(value){
        value = value.replace('ctrl', 'CmdOrCtrl');
        return value;
    }

}

module.exports = ShortCuts;
