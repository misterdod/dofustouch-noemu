const {app, dialog} = require('electron');
const {BrowserWindow} = require('electron');


const Emulator = require('./Emulator');

class MessageBox {

    static error(title, text){
        dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
            type: 'error',
            title: title,
            message: text,
            buttons: ['Fermer']
        });
    }

}

module.exports = MessageBox;
