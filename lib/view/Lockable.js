"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const ImagineContract_1 = __importDefault(require("../contracts/ImagineContract"));
const ImagineUseContract_1 = __importDefault(require("../contracts/ImagineUseContract"));
const NFTContract_1 = __importDefault(require("../contracts/NFTContract"));
const database_json_1 = __importDefault(require("../database.json"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const rarity_json_1 = __importDefault(require("../rarity.json"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Lockable {
    constructor(viewParams) {
        this.sortBy = "id-low";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".lockable-view", (0, skynode_1.el)("header", (0, skynode_1.el)("section", (0, skynode_1.el)("h4.section-title", "Wallet Connect"), this.walletAddressDisplay = (0, skynode_1.el)(".wallet-address"))), (0, skynode_1.el)(".case-container", (0, skynode_1.el)("h4", "My Cases"), (0, skynode_1.el)("select", (0, skynode_1.el)("option", "Sort By", { value: "id-low" }), (0, skynode_1.el)("option", "Id - Low", { value: "id-low" }), (0, skynode_1.el)("option", "Id - High", { value: "id-high" }), (0, skynode_1.el)("option", "Rarity - High", { value: "rarity-high" }), (0, skynode_1.el)("option", "Rarity - Low", { value: "rarity-low" }), {
            change: (event, input) => {
                this.sortBy = input.domElement.value;
                this.load();
            },
        }), this.caseList = (0, skynode_1.el)(".case-list")), this.detail = (0, skynode_1.el)("main")));
        if (viewParams.caseId !== undefined) {
            this.currentId = parseInt(viewParams.caseId, 10);
        }
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
                        ViewUtil_1.default.go(`/my-cases/${caseId}`);
                    },
                }));
            }
            if (cases.length > 0) {
                if (this.currentId !== undefined) {
                    this.showDetail(this.currentId);
                }
                else {
                    this.showDetail(cases[0]);
                }
            }
        }
    }
    async showDetail(caseId) {
        this.currentId = caseId;
        const token = database_json_1.default[caseId];
        const used = await ImagineUseContract_1.default.used(caseId);
        this.detail.empty().append((0, skynode_1.el)(".case-container", (0, skynode_1.el)(".case", (0, skynode_1.el)("h5", `Case #${caseId}`), (0, skynode_1.el)("p", token.text)), (0, skynode_1.el)(".score", (0, skynode_1.el)("h5", "Rarity Score"), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(String(rarity_json_1.default.scores[caseId])))), (0, skynode_1.el)("a.opensea-button", "View on Opensea", {
            href: `https://opensea.io/assets/klaytn/0x0af3f3fe9e822b7a740ca45ce170340b2da6f4cc/${caseId}`,
            target: "_blank",
        })), used === true ? (0, skynode_1.el)(".lockable-contents", (0, skynode_1.el)(".title", (0, skynode_1.el)("p", "Lockable\nContents")), (0, skynode_1.el)("a.contents", (0, skynode_1.el)("img", { src: `https://storage.googleapis.com/cbk-nft/pfp/${caseId}.png` }), {
            href: `https://storage.googleapis.com/cbk-nft/pfp/${caseId}.png`,
            target: "_blank",
        })) : (0, skynode_1.el)(".unlocked", (0, skynode_1.el)("main", (0, skynode_1.el)("section", (0, skynode_1.el)("p", "담배 한 대 말아 피워도 될까요?\n담배 종이 1장, 필터 1개, 담배잎 2장이 필요해요.\n* 최초 사용시에는 2번의 트랜잭션이 필요합니다."), (0, skynode_1.el)("a", "1) 예, 그러시죠.", {
            click: async () => {
                const addr = await Wallet_1.default.loadAddress();
                if (addr !== undefined) {
                    if ((await ImagineContract_1.default.balanceOf(addr, 0)).lt(2)) {
                        alert("담배잎이 부족합니다.");
                    }
                    else if ((await ImagineContract_1.default.balanceOf(addr, 1)).lt(1)) {
                        alert("필터가 부족합니다.");
                    }
                    else if ((await ImagineContract_1.default.balanceOf(addr, 2)).lt(1)) {
                        alert("담배 종이가 부족합니다.");
                    }
                    else {
                        await ImagineUseContract_1.default.use(caseId);
                        setTimeout(() => skyrouter_1.SkyRouter.refresh(), 2000);
                    }
                }
            },
        }), (0, skynode_1.el)("a", "2) 재료를 준비해서 다시 올게요.", {
            click: () => ViewUtil_1.default.go(`/my-cases/${caseId}`),
        })))), (0, skynode_1.el)("a.lockable", (0, skynode_1.el)("img", { src: "/images/lockable.png", width: "209px" }), (0, skynode_1.el)("h4", "Lockable\nContents"), {
            click: () => ViewUtil_1.default.go(`/my-cases/${caseId}`),
        }));
    }
    changeParams(params, uri) {
        if (params.caseId !== undefined) {
            this.showDetail(parseInt(params.caseId, 10));
        }
    }
    close() {
        this.container.delete();
    }
}
exports.default = Lockable;
//# sourceMappingURL=Lockable.js.map