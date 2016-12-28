import { Component, Optional, Input, Inject } from '@angular/core';
import { Tab } from './../tab/tab';
import { ShortCutsService } from '../shortcuts/shortcuts.service';
import * as async from 'async';

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

    public gameReady(): void {
        /*this.shortCutsService.bind('a', this.wGame, ()=>{
            console.log('you press a');
        });*/

        this.setEventListener();
    }

    private setEventListener(): void{

        // event -> resize window game
        this.wGame.onresize = () => {
            (<any>this.wGame).gui._resizeUi();
        };


        // event -> log into the world
        (<any>this.wGame).gui.playerData.on("characterSelectedSuccess", () => {
            
            // retrieve character name
            this.tab.character = (<any>this.wGame).gui.playerData.characterBaseInformations.name;

            // bind shortcut
            this.bindShortcuts();
        });


    }

    private bindShortcuts(): void {

        // end turn
        this.shortCutsService.bind(settings.getSync('option.shortcut.diver.end-turn'), this.wGame, ()=>{
            (<any>this.wGame).gui.fightManager.finishTurn()
        });

        // spell
        async.forEachOf(settings.getSync('option.shortcut.spell'), (shortcut: string, index: number) =>{
            this.shortCutsService.bind(shortcut, this.wGame, ()=>{
                (<any>this.wGame).gui.shortcutBar.panels.spell.slotList[index].tap();
            });
        });

        // item
        async.forEachOf(settings.getSync('option.shortcut.item'), (shortcut: string, index: number) =>{
            this.shortCutsService.bind(shortcut, this.wGame, ()=>{
                (<any>this.wGame).gui.shortcutBar.panels.item.slotList[index].tap();
            });
        });

        // interfaces
        async.forEachOf(settings.getSync('option.shortcut.interface'), (shortcut: string, key: string) =>{
            (<any>this.wGame).gui.menuBar._icons._childrenList.forEach((element: any, index: number) => {
                if(element.id.toUpperCase() == key.toUpperCase()){
                    this.shortCutsService.bind(shortcut, this.wGame, () => {
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
        console.log(settings.getSync('option.shortcut.spell'));
    }

    ngAfterViewInit() {
        // After View Init get the iFrame
        this.wGame = this.window['Frame' + this.tab.id].contentWindow;

    }

}
