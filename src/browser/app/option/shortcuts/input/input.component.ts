import {Component, Optional, ViewEncapsulation, Inject, Input, Output, NgZone, EventEmitter} from '@angular/core';


//const { ipcRenderer } = (<any>global).nodeRequire('electron');

@Component({
    selector: 'option-shortcuts-input',
    templateUrl: 'app/option/shortcuts/input/input.component.html',
    styleUrls: ['app/option/shortcuts/input/input.component.css'],
    host: {

    }
})
export class InputComponent {

    @Input() private name: string;
    @Input() private id: string;
    @Input() private model: any;
    @Output() modelChange: EventEmitter<any> = new EventEmitter();

    constructor(
    ) {

    }


}
