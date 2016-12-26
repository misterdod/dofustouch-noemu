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
var TabService = (function () {
    function TabService() {
        this.tabs = [];
    }
    TabService.prototype.getTabs = function () {
        return this.tabs;
    };
    TabService.prototype.getTab = function (id) {
        return this.tabs.filter(function (tab) {
            return tab.id === id;
        })[0];
    };
    TabService.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    TabService.prototype.getNearTab = function (nearTab) {
        var tabs = this.tabs.filter(function (tab) {
            return tab.id > nearTab.id;
        });
        if (tabs) {
            return tabs[0];
        }
        tabs = this.tabs.filter(function (tab) {
            return tab.id < nearTab.id;
        });
        if (tabs) {
            return tabs[(tabs.length - 1)];
        }
        return null;
    };
    TabService.prototype.removeTab = function (tab) {
        console.log('remove tab');
        var index = this.tabs.indexOf(tab);
        if (index !== -1) {
            console.log('remove');
            this.tabs.splice(index, 1);
        }
    };
    return TabService;
}());
TabService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], TabService);
exports.TabService = TabService;

//# sourceMappingURL=tab.service.js.map
