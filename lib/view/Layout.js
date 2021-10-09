"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append(this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "Cases by Kate"), (0, skynode_1.el)("h2", "Rarity Table"), (0, skynode_1.el)(".menu", (0, skynode_1.el)("a", "All Cases", { click: () => ViewUtil_1.default.go("/") }), (0, skynode_1.el)("a", "My Cases", { click: () => ViewUtil_1.default.go("/my-cases") }))), (0, skynode_1.el)("main", this.content = (0, skynode_1.el)(".content")), (0, skynode_1.el)("footer", (0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/logo.png", height: "120" }), { href: "https://casesbykate.xyz/" }), (0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/website.png", height: "40" }), { href: "https://casesbykate.xyz/" }), (0, skynode_1.el)("a", (0, skynode_1.el)("img", { src: "/images/opensea.png", height: "48" }), { href: "https://opensea.io/collection/cases-by-kate" }))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map