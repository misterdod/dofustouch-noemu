import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import { SettingsService } from '../../../settings/settings.service';


//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'option-shortcuts',
    templateUrl: 'app/option/shortcuts/no-emu/no-emu.component.html',
    styleUrls: ['app/option/shortcuts/no-emu/no-emu.component.css'],
    host: {

    }
})
export class NoEmuComponent {

    constructor(
        private settingsService: SettingsService
    ) {

    }

}
