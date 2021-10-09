"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const rarity_json_1 = __importDefault(require("./rarity.json"));
(async () => {
    const scores = Object.entries(rarity_json_1.default.scores);
    scores.sort((a, b) => b[1] - a[1]);
    let rankDisplay;
    let traitDisplay;
    skynode_1.BodyNode.append((0, skynode_1.el)("h1", "Cases by Kate Rarity Table"), (0, skynode_1.el)(".total-count", `Total: ${String(rarity_json_1.default.totalCount)}`), (0, skynode_1.el)("main", (0, skynode_1.el)(".rank", (0, skynode_1.el)("table", (0, skynode_1.el)("thead", (0, skynode_1.el)("tr", (0, skynode_1.el)("th", "Rank"), (0, skynode_1.el)("th", "ID"), (0, skynode_1.el)("th", "Score"))), rankDisplay = (0, skynode_1.el)("tbody"))), (0, skynode_1.el)(".trait", (0, skynode_1.el)("table", (0, skynode_1.el)("thead", (0, skynode_1.el)("tr", (0, skynode_1.el)("th", "종류"), (0, skynode_1.el)("th", "값"), (0, skynode_1.el)("th", "개수"), (0, skynode_1.el)("th", "퍼센트"), (0, skynode_1.el)("th", "점수"), (0, skynode_1.el)("th", "목록"))), traitDisplay = (0, skynode_1.el)("tbody")))));
    for (const [rank, score] of scores.entries()) {
        rankDisplay.append((0, skynode_1.el)("tr", (0, skynode_1.el)("td", String(rank + 1)), (0, skynode_1.el)("td", score[0]), (0, skynode_1.el)("td", String(score[1]))));
    }
    for (const [category, traits] of Object.entries(rarity_json_1.default.traits)) {
        for (const [trait, info] of Object.entries(traits)) {
            if (info.count > 0) {
                traitDisplay.append((0, skynode_1.el)("tr", (0, skynode_1.el)("td", category), (0, skynode_1.el)("td", trait), (0, skynode_1.el)("td", String(info.count)), (0, skynode_1.el)("td", String(info.percent)), (0, skynode_1.el)("td", String(info.score)), (0, skynode_1.el)("td", (0, skynode_1.el)(".ids", info.ids.join(", "), {
                    style: {
                        height: 100,
                        overflow: "auto",
                    },
                }))));
            }
        }
    }
})();
//# sourceMappingURL=main%20copy.js.map