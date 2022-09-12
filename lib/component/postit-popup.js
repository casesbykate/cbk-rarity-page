"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class PostitPopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".dialogue.postit-popup", (0, skynode_1.el)(".content", (0, skynode_1.el)("p", "담배 한 대 말아 피워도 될까요?\n담배 종이 1장, 필터 1개, 담배잎 2장이 필요해요."), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("a", "1)예, 그러시죠."), (0, skynode_1.el)("a", "2)재료를 준비해서 다시 올게요.", {
            click: () => {
                this.delete();
            }
        })))));
    }
    delete() {
        super.delete();
    }
}
exports.default = PostitPopup;
//# sourceMappingURL=postit-popup.js.map