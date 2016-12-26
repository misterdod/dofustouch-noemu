import { Component, Optional, Input, Inject } from '@angular/core';
import { Tab } from './../tab/tab';
import { ShortCutsService } from '../shortcuts/shortcuts.service';

const settings = (<any>global).nodeRequire('electron-settings')

@Component({
    selector: 'game',
    templateUrl: 'app/game/game.component.html',
    styleUrls: ['app/game/game.component.css']
})
export class GameComponent {

    @Input() private tab: Tab;
    private wGame: Window;

    constructor(
        @Inject('Window') private window: Window,
        private shortCutsService: ShortCutsService
    ) {

    }

    public gameReady() {
        this.shortCutsService.bind('a', this.wGame, null);
    }

    ngOnInit() {
        console.log('component game created', this.tab.id);
        console.log(settings.getSync('option.shortcut.spell'));
    }

    ngAfterViewInit() {
        // After View Init get the iFrame
        this.wGame = this.window['Frame' + this.tab.id].contentWindow;
    }

}
