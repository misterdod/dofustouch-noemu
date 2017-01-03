const { ipcRenderer } = (<any>global).nodeRequire('electron');

import { NgModule }      from '@angular/core';
import { RouterModule }   from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { OptionComponent } from './option/option.component';
import { GeneralComponent } from './option/general/general.component';
import { ShortcutsComponent } from './option/shortcuts/shortcuts.component';
import { NoEmuComponent } from './option/shortcuts/no-emu/no-emu.component';
import { InputComponent } from './option/shortcuts/input/input.component';


import { GameComponent } from './main/game/game.component';
import { TabService } from './main/tab/tab.service';
import { IpcRendererService } from './electron/ipcrenderer.service';
import { SettingsService } from './settings/settings.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        //MaterialModule.forRoot(),
        FlexLayoutModule.forRoot(),
        NgbModule.forRoot(),
        RouterModule.forRoot([
            {
                path: 'main',
                component: MainComponent
            },
            {
                path: 'option',
                component: OptionComponent,
                children: [
                    { path: '', redirectTo: 'general', pathMatch: 'full' },
                    {
                        path: 'shortcuts',
                        component: ShortcutsComponent,
                        children: [
                            { path: '', redirectTo: 'no-emu', pathMatch: 'full' },
                            { path: 'no-emu', component: NoEmuComponent }
                        ]

                    },
                    { path: 'general', component: GeneralComponent }
                ]
            },
            {
                path: '',
                redirectTo: '/main',
                pathMatch: 'full'
            }
        ], { useHash: true }) // hack to work routing on electron
    ],
    declarations: [
        AppComponent,
        GameComponent,
        MainComponent,
        OptionComponent,
        GeneralComponent,
        ShortcutsComponent,
        NoEmuComponent,
        InputComponent
    ],
    providers: [
        TabService,
        SettingsService,
        { provide: 'Window', useValue: window },
        IpcRendererService,
        { provide: APP_BASE_HREF, useValue: '/' } // hack to work routing on electron
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
