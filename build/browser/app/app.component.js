"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var tab_service_1 = require("./tab/tab.service");
var tab_1 = require("./tab/tab");
var AppComponent = (function () {
    function AppComponent(tabService) {
        this.tabService = tabService;
        this.activTab = null;
    }
    AppComponent.prototype.getTabs = function () {
        this.tabs = this.tabService.getTabs();
        //this.activTab = this.tabService.getTab(0);
    };
    AppComponent.prototype.addTab = function () {
        var tab = new tab_1.Tab();
        this.tabService.addTab(tab);
        this.selectTab(tab);
    };
    AppComponent.prototype.removeTab = function (tab) {
        if (this.activTab !== null && tab.id === this.activTab.id) {
            console.log('activTab was deleted');
            this.activTab = null;
        }
        this.tabService.removeTab(tab);
    };
    AppComponent.prototype.selectTab = function (tab) {
        if (this.activTab !== null) {
            this.activTab.isFocus = false;
        }
        tab.isFocus = true;
        this.activTab = tab;
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getTabs();
        //this.addTab();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'application',
        templateUrl: 'app/app.component.html',
        styleUrls: ['app/app.component.css'],
    }),
    __metadata("design:paramtypes", [tab_service_1.TabService])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
