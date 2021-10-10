"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const NFTContract_1 = __importDefault(require("../contracts/NFTContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
const database_json_1 = __importDefault(require("../database.json"));
const rarity_json_1 = __importDefault(require("../rarity.json"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
class MyCases {
    constructor() {
        this.sortBy = "id-low";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".my-cases-view", (0, skynode_1.el)("header", (0, skynode_1.el)("section", (0, skynode_1.el)("h4.section-title", "Wallet Connect"), this.walletAddressDisplay = (0, skynode_1.el)(".wallet-address"))), (0, skynode_1.el)(".case-container", (0, skynode_1.el)("h4", "My Cases"), (0, skynode_1.el)("select", (0, skynode_1.el)("option", "Sort By", { value: "id-low" }), (0, skynode_1.el)("option", "Id - Low", { value: "id-low" }), (0, skynode_1.el)("option", "Id - High", { value: "id-high" }), (0, skynode_1.el)("option", "Rarity - High", { value: "rarity-high" }), (0, skynode_1.el)("option", "Rarity - Low", { value: "rarity-low" }), {
            change: (event, input) => {
                this.sortBy = input.domElement.value;
                this.load();
            },
        }), this.caseList = (0, skynode_1.el)(".case-list")), this.detail = (0, skynode_1.el)("main")));
        this.load();
    }
    async load() {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.walletAddressDisplay.empty().appendText(address);
            const balance = (await NFTContract_1.default.balanceOf(address)).toNumber();
            let cases = [];
            const promises = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index) => {
                    const mateId = (await NFTContract_1.default.tokenOfOwnerByIndex(address, index)).toNumber();
                    cases.push(mateId);
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);
            if (this.sortBy === "id-high") {
                cases = cases.reverse();
            }
            else if (this.sortBy === "rarity-high") {
                cases.sort((a, b) => {
                    return rarity_json_1.default.scores[b] - rarity_json_1.default.scores[a];
                });
            }
            else if (this.sortBy === "rarity-low") {
                cases.sort((a, b) => {
                    return rarity_json_1.default.scores[a] - rarity_json_1.default.scores[b];
                });
            }
            this.caseList.empty();
            for (const caseId of cases) {
                this.caseList.append((0, skynode_1.el)("a.case", `Case #${caseId}`, {
                    click: () => {
                        this.showDetail(caseId);
                    },
                }));
            }
            if (cases.length > 0) {
                this.showDetail(cases[0]);
            }
        }
    }
    showDetail(caseId) {
        const token = database_json_1.default[caseId];
        this.detail.empty().append((0, skynode_1.el)(".case-container", (0, skynode_1.el)(".case", (0, skynode_1.el)("h5", `Case #${caseId}`), (0, skynode_1.el)("p", token.text)), (0, skynode_1.el)(".score", (0, skynode_1.el)("h5", "Rarity Score"), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(String(rarity_json_1.default.scores[caseId])))), (0, skynode_1.el)("a.opensea-button", "View on Opensea", {
            href: `https://opensea.io/assets/klaytn/0x0af3f3fe9e822b7a740ca45ce170340b2da6f4cc/${caseId}`,
            target: "_blank",
        })), (0, skynode_1.el)(".properties", ...Object.keys(rarity_json_1.default.traits).map((key) => (0, skynode_1.el)(".property", (0, skynode_1.el)("h5", key), (0, skynode_1.el)("span", token.attributes.find((a) => a.trait_type === key).value)))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MyCases;
//# sourceMappingURL=MyCases.js.map