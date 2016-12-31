import { Injectable, NgZone } from '@angular/core';
import { ISettings } from './../../../shared/settings'

const settings = (<any>global).nodeRequire('electron-settings');

@Injectable()
export class SettingsService {

    constructor(
        private zone: NgZone
    ) {

    }


}
