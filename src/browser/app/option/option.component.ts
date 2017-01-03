import {Component, Optional, ViewEncapsulation, Inject, Input, NgZone} from '@angular/core';
import { ShortCuts } from './../shortcuts/shortcuts';
import { IpcRendererService } from './../electron/ipcrenderer.service';

//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'main',
    templateUrl: 'app/option/option.component.html',
    styleUrls: ['app/option/option.component.css'],
    host: {
        "fxFlex": "",
        "fxFill": "",
        "style":"height:100%" // find something less ugly in future
    }
})
export class OptionComponent {
    
}
