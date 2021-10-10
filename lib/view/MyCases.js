"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class MyCases {
    constructor() {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".my-cases-view", (0, skynode_1.el)("header", (0, skynode_1.el)("section", (0, skynode_1.el)("h4.section-title", "Wallet Connect"), this.walletAddressDisplay = (0, skynode_1.el)(".wallet-address")))));
        this.load();
    }
    async load() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.walletAddressDisplay.empty().appendText(address);
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MyCases;
//# sourceMappingURL=MyCases.js.map