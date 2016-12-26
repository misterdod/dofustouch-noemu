import {Component, Optional, ViewEncapsulation, Inject} from '@angular/core';
import {TabService} from './tab/tab.service';
import {Tab} from './tab/tab';

@Component({
    selector: 'application',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
})
export class AppComponent {
    lastDialogResult: string;
    tabs: Tab[];
    activTab: Tab = null;

    constructor(
        private tabService: TabService
    ) {

    }

    getTabs(): void {
        this.tabs = this.tabService.getTabs();
        //this.activTab = this.tabService.getTab(0);
    }

    addTab(): void {
        let tab: Tab = new Tab();
        this.tabService.addTab(tab);

        this.selectTab(tab);
    }

    removeTab(tab: Tab): void {

        if(this.activTab !== null && tab.id === this.activTab.id){
            console.log('activTab was deleted');
            this.activTab = null;
            //let newTab = this.tabService.getNearTab(tab);
            //this.selectTab(newTab.id)
        }

        this.tabService.removeTab(tab);
    }

    selectTab(tab: Tab): void {
        if(this.activTab !== null){
            this.activTab.isFocus = false;
        }

        tab.isFocus = true;
        this.activTab = tab;
    }

    ngOnInit(): void {
        this.getTabs();
        //this.addTab();
    }
}
