import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISettings, IGeneral } from './../../../shared/settings'

const settings = (<any>global).nodeRequire('electron-settings');

export class Option {
    public general: Option.General;
    public shortcuts: Option.Shortcuts;

    constructor() {
        this.general = new Option.General();
        this.shortcuts = new Option.Shortcuts();
    }
}

export module Option {

    export class Shortcuts {
        public no_emu: Shortcuts.NoEmu;
        public diver: Shortcuts.Diver;
        public interface: Shortcuts.Interface;
        private _spell: Array<string>;
        private _item: Array<string>;

        constructor() {
            this.no_emu = new Shortcuts.NoEmu();
            this.diver = new Shortcuts.Diver();
        }
    }

    export module Shortcuts {

        export class Interface {
            private _carac: string;
            private _spell: string;
            private _bag: string;
            private _bidhouse: string;
            private _map: string;
            private _friend: string;
            private _book: string;
            private _guild: string;
            private _conquest: string;
            private _job: string;
            private _alliance: string;
            private _mount: string;
            private _directory: string;
            private _alignement: string;
            private _bestiary: string;
            private _title: string;
            private _achievement: string;
            private _almanax: string;
            private _spouse: string;
            private _shop: string;
            private _goultine: string;

            get carac(): string {
                return this._carac;
            }

            set carac(carac: string) {
                settings.setSync('option.shortcuts.interface.carac', carac);
                this._carac = carac;
            }

            get spell(): string {
                return this._spell;
            }

            set spell(spell: string) {
                settings.setSync('option.shortcuts.interface.spell', spell);
                this._spell = spell;
            }

            get bag(): string {
                return this._bag;
            }

            set bag(bag: string) {
                settings.setSync('option.shortcuts.interface.bag', bag);
                this._bag = bag;
            }

            constructor() {

            }
        }

        export class NoEmu {
            private _new_tab: string;
            private _new_window: string;
            private _next_tab: string;
            private _prev_tab: string;
            private _activ_tab: string;
            private _tabs: Array<string>;

            get new_tab(): string {
                return this._new_tab;
            }

            set new_tab(new_tab: string) {
                settings.setSync('option.shortcuts.no_emu.new_tab', new_tab);
                this._new_tab = new_tab;
            }

            get new_window(): string {
                return this._new_window;
            }

            set new_window(new_window: string) {
                settings.setSync('option.shortcuts.no_emu.new_window', new_window);
                this._new_window = new_window;
            }

            get next_tab(): string {
                return this._next_tab;
            }

            set next_tab(next_tab: string) {
                settings.setSync('option.shortcuts.no_emu.next_tab', next_tab);
                this._next_tab = next_tab;
            }

            get prev_tab(): string {
                return this._prev_tab;
            }

            set prev_tab(prev_tab: string) {
                settings.setSync('option.shortcuts.no_emu.prev_tab', prev_tab);
                this._prev_tab = prev_tab;
            }

            get activ_tab(): string {
                return this._activ_tab;
            }

            set activ_tab(activ_tab: string) {
                settings.setSync('option.shortcuts.no_emu.activ_tab', activ_tab);
                this._activ_tab = activ_tab;
            }

            get tabs(): Array<string> {
                return new Proxy(this._tabs, {
                    get: function(target, name) {
                        return target[name];
                    },
                    set(target, prop: string, value) {
                        console.log('proxy set tabs');
                        //this._tabs[prop] = value;
                        target[prop] = value;
                        settings.setSync('option.shortcuts.no_emu.tabs', target);
                        return true;
                    }
                });
            }

            set tabs(tabs: Array<string>) {
                console.log(tabs);
                settings.setSync('option.shortcuts.no_emu.tabs', tabs);
                this._tabs = tabs;
            }

            constructor() {
                this.new_tab = settings.getSync('option.shortcuts.no_emu.new_tab');
                this.new_window = settings.getSync('option.shortcuts.no_emu.new_window');
                this.next_tab = settings.getSync('option.shortcuts.no_emu.next_tab');
                this.prev_tab = settings.getSync('option.shortcuts.no_emu.prev_tab');
                this.activ_tab = settings.getSync('option.shortcuts.no_emu.activ_tab');
                this.tabs = settings.getSync('option.shortcuts.no_emu.tabs');
            }
        }

        export class Diver {
            private _end_turn: string;

            get end_turn(): string {
                return this._end_turn;
            }

            set end_turn(end_turn: string) {
                settings.setSync('option.shortcuts.diver.end_turn', end_turn);
                this._end_turn = end_turn;
            }

            constructor() {
                this.end_turn = settings.getSync('option.shortcuts.diver.end_turn');
            }
        }
    }

    export class General {

        private _hidden_shop: boolean;
        private _developper_mode: boolean;
        private _resolution: {
            x: boolean;
            y: boolean;
        }

        get hidden_shop(): boolean {
            return this._hidden_shop;
        }

        set hidden_shop(hidden_shop: boolean) {
            settings.setSync('option.general.hidden_shop', hidden_shop);
            this._hidden_shop = hidden_shop;
        }

        get developper_mode() {
            return this._developper_mode;
        }

        set developper_mode(developper_mode: boolean) {
            settings.setSync('option.general.developper_mode', developper_mode);
            this._developper_mode = developper_mode;
        }

        get resolution() {
            return this._resolution;
        }

        set resolution(resolution: any) {
            settings.setSync('option.general.resolution', resolution);
            this._resolution = resolution;
        }

        constructor() {
            this.hidden_shop = settings.getSync('option.general.hidden_shop');
            this.developper_mode = settings.getSync('option.general.developper_mode');
            this.resolution = settings.getSync('option.general.resolution');
        }
    }
}


@Injectable()
export class SettingsService {

    public option: Option;

    constructor() {
        this.option = new Option();
    }

}
