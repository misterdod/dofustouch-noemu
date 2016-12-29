import { Component, Optional, Input, Inject, NgZone } from '@angular/core';
import { Tab } from './../tab/tab';
import { ShortCuts } from '../shortcuts/shortcuts';
import * as async from 'async';
import { IpcRendererService } from './../electron/ipcrenderer.service';

const settings = (<any>global).nodeRequire('electron-settings');

@Component({
    selector: 'game',
    templateUrl: 'app/game/game.component.html',
    styleUrls: ['app/game/game.component.css']
})
export class GameComponent {

    @Input() private tab: Tab;
    private wGame: Window;
    private shortCuts: ShortCuts;

    constructor(
        @Inject('Window') private window: Window,
        private ipcRendererService: IpcRendererService,
        private zone: NgZone
    ) {

    }

    public gameReady(): void {
        this.setEventListener();
    }

    private setEventListener(): void {

        // event -> resize window game
        this.wGame.onresize = () => {
            (<any>this.wGame).gui._resizeUi();
        };


        // event -> log into the world
        (<any>this.wGame).gui.playerData.on("characterSelectedSuccess", () => {

            // retrieve character name and update zone.js
            this.zone.run(() => {
                this.tab.character = (<any>this.wGame).gui.playerData.characterBaseInformations.name;
                this.tab.isLogged = true;
            });

            // bind shortcut
            this.bindShortcuts();
        });

        // event -> electron ask for reload setting
        this.ipcRendererService.on('reload-settings', (event: any, arg: any) => {
            if (this.tab.isLogged) {
                // unbind all registered shortcuts
                this.shortCuts.unBindAll();

                // re-bind new shortcuts
                this.bindShortcuts();
            }
        });
    }

    private bindShortcuts(): void {

        // end turn
        this.shortCuts.bind(settings.getSync('option.shortcut.diver.end-turn'), () => {
            (<any>this.wGame).gui.fightManager.finishTurn()
        });

        // spell
        async.forEachOf(settings.getSync('option.shortcut.spell'), (shortcut: string, index: number) => {
            this.shortCuts.bind(shortcut, () => {
                (<any>this.wGame).gui.shortcutBar.panels.spell.slotList[index].tap();
            });
        });

        // item
        async.forEachOf(settings.getSync('option.shortcut.item'), (shortcut: string, index: number) => {
            this.shortCuts.bind(shortcut, () => {
                (<any>this.wGame).gui.shortcutBar.panels.item.slotList[index].tap();
            });
        });

        // interfaces
        async.forEachOf(settings.getSync('option.shortcut.interface'), (shortcut: string, key: string) => {
            (<any>this.wGame).gui.menuBar._icons._childrenList.forEach((element: any, index: number) => {
                if (element.id.toUpperCase() == key.toUpperCase()) {
                    this.shortCuts.bind(shortcut, () => {
                        let newIndex = index;
                        (<any>this.wGame).gui.menuBar._icons._childrenList[newIndex].tap();
                    });
                    return;
                }
            });
        });
    }

    ngOnInit() {
        console.log('component game created', this.tab.id);
    }

    ngAfterViewInit() {
        // After View Init get the iFrame
        this.wGame = this.window['Frame' + this.tab.id].contentWindow;
        this.shortCuts = new ShortCuts(this.wGame);
    }

}
