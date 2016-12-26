"use strict";
var Tab = (function () {
    function Tab() {
        this.id = Tab.seqId++;
        this.character = "non connecté";
        this.isLogged = false;
        this.isFocus = false;
    }
    return Tab;
}());
Tab.seqId = 1;
exports.Tab = Tab;

//# sourceMappingURL=tab.js.map
