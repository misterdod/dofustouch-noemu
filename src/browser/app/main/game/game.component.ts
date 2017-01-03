import { Component, Optional, Input, Inject, NgZone } from '@angular/core';
import { Tab } from './../tab/tab';
import { ShortCuts } from './../../shortcuts/shortcuts';
import * as async from 'async';
import { IpcRendererService } from './../../electron/ipcrenderer.service';

const settings = (<any>global).nodeRequire('electron-settings');

@Component({
    selector: 'game',
    templateUrl: 'app/main/game/game.component.html',
    styleUrls: ['app/main/game/game.component.css']
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
        
        // event -> party invitation
        (<any>this.wGame).gui.on("PartyInvitationMessage", (partyData: any) => {
            this.acceptPartyInvitation(partyData)
        });

        // event -> fight auto join
        (<any>this.wGame).gui.on("PartyMemberInFightMessage", (fightData: any) => {
            this.joinFight(fightData)
        });
    }

    private bindShortcuts(): void {

        // end turn
        this.shortCuts.bind(settings.getSync('option.shortcuts.diver.end_turn'), () => {
            this.finishTurn()
        });

        // spell
        async.forEachOf(settings.getSync('option.shortcuts.spell'), (shortcut: string, index: number) => {
            this.shortCuts.bind(shortcut, () => {
                (<any>this.wGame).gui.shortcutBar.panels.spell.slotList[index].tap();
            });
        });

        // item
        async.forEachOf(settings.getSync('option.shortcuts.item'), (shortcut: string, index: number) => {
            this.shortCuts.bind(shortcut, () => {
                (<any>this.wGame).gui.shortcutBar.panels.item.slotList[index].tap();
            });
        });

        // interfaces
        async.forEachOf(settings.getSync('option.shortcuts.interface'), (shortcut: string, key: string) => {
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
    
    private finishTurn(): void {
        (<any>this.wGame).gui.fightManager.finishTurn()
    }

    /**
    * Join a fight
    * @param fightData : data received from Dofus and contains informations about the fight to join
    */
    private joinFight(fightData: {fightId: number, memberId: number, memberName: string}): void {
        /* reçu :
        _isInitialized:true
        _messageType:"PartyMemberInFightMessage"
        fightId:xxx
        fightMap:Object
        memberAccountId:xxx
        memberId:xxx
        memberName:"yyy"
        partyId:xxx
        reason:1
        secondsBeforeFightStart:44998
        */
        var i = (<any>this.wGame).gui.playerData.isFighting && !(<any>this.wGame).gui.playerData.isSpectator;
        /* TODO : "{fromPlayerName}" to replace with an option that contains several pseudo?
                  or join if fight is from party?*/
        if (!i && "{fromPlayerName}" == fightData.memberName) {
          // to send : fightId:901 ; fighterId:115905
          (<any>this.wGame).dofus.sendMessage("GameFightJoinRequestMessage", {
            fightId: fightData.fightId,
            fighterId: fightData.memberId
          });

          // FIXME : ne fonctionne pas (pour le is ready en auto)
          //(<any>this.wGame).gui.on("GameFightJoinMessage", (e) => {
          //  (<any>this.wGame).dofus.sendMessage("GameFightJoinRequestMessage", {
          //  isReady: true
          //  });
          //});
        }
    }

    /**
    * Join a party
    * @param partyData : data received from Dofus and contains informations about the party to join
    */
    private acceptPartyInvitation(partyData: {fromName: string, partyId: number}): void {
        // TODO : "{fromPlayerName}" to replace with an option that contains several pseudo?
        if("{fromPlayerName}" == partyData.fromName) {
            // (<any>this.wGame).gui.notificationBar.removeNotification("party" + partyData.partyId);
            (<any>this.wGame).dofus.sendMessage("PartyAcceptInvitationMessage", {
                partyId: partyData.partyId
            });
            (<any>this.wGame).gui._closePartyInvitation(partyData.partyId);
        }
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
