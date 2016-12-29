import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AppComponent } from './app.component';
import {GameComponent} from './game/game.component';
import { TabService } from './tab/tab.service';
import { IpcRendererService } from './electron/ipcrenderer.service';

const { ipcRenderer } = (<any>global).nodeRequire('electron');

@NgModule({
    imports: [
        BrowserModule,
        //MaterialModule.forRoot(),
        FlexLayoutModule.forRoot(),
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        GameComponent
    ],
    providers: [
        TabService,
        { provide: 'Window', useValue: window },
        IpcRendererService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
