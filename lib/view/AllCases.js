"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class AllCases {
    constructor() {
        this.page = 1;
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".all-cases-view", (0, skynode_1.el)("header", (0, skynode_1.el)("section", (0, skynode_1.el)("h4.section-title", "Lookup"), (0, skynode_1.el)("input")), (0, skynode_1.el)("section", (0, skynode_1.el)("h4.section-title", "Sort By"), (0, skynode_1.el)("select", (0, skynode_1.el)("option", "Id - Low"), (0, skynode_1.el)("option", "Id - High"), (0, skynode_1.el)("option", "Rarity - High"), (0, skynode_1.el)("option", "Rarity - Low"))), (0, skynode_1.el)("section", (0, skynode_1.el)("h4.section-title", "Page"), (0, skynode_1.el)(".page", this.pageDisplay = (0, skynode_1.el)("span", "1 of 34"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("a.prev-button", "Prev"), (0, skynode_1.el)("a.next-button", "Next")))))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = AllCases;
//# sourceMappingURL=AllCases.js.map