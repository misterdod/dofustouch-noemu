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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var tab_1 = require("./../tab/tab");
var shortcuts_service_1 = require("../shortcuts/shortcuts.service");
var settings = global.nodeRequire('electron-settings');
var GameComponent = (function () {
    function GameComponent(window, shortCutsService) {
        this.window = window;
        this.shortCutsService = shortCutsService;
    }
    GameComponent.prototype.gameReady = function () {
        this.shortCutsService.bind('a', this.wGame, null);
    };
    GameComponent.prototype.ngOnInit = function () {
        console.log('component game created', this.tab.id);
        console.log(settings.getSync('option.shortcut.spell'));
    };
    GameComponent.prototype.ngAfterViewInit = function () {
        // After View Init get the iFrame
        this.wGame = this.window['Frame' + this.tab.id].contentWindow;
    };
    return GameComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tab_1.Tab)
], GameComponent.prototype, "tab", void 0);
GameComponent = __decorate([
    core_1.Component({
        selector: 'game',
        templateUrl: 'app/game/game.component.html',
        styleUrls: ['app/game/game.component.css']
    }),
    __param(0, core_1.Inject('Window')),
    __metadata("design:paramtypes", [Window,
        shortcuts_service_1.ShortCutsService])
], GameComponent);
exports.GameComponent = GameComponent;

//# sourceMappingURL=game.component.js.map
