import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AppComponent } from './app.component';
import {GameComponent} from './game/game.component';
import { TabService } from './tab/tab.service';
import { ShortCutsService } from './shortcuts/shortcuts.service';

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
        ShortCutsService,
        { provide: 'Window', useValue: window }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
