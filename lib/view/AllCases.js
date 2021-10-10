"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const database_json_1 = __importDefault(require("../database.json"));
const rarity_json_1 = __importDefault(require("../rarity.json"));
const Layout_1 = __importDefault(require("./Layout"));
class AllCases {
    constructor() {
        this.selects = [];
        this.filter = {};
        this.sortBy = "id-low";
        this.page = 1;
        this.lastPage = 34;
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".all-cases-view", (0, skynode_1.el)("header", (0, skynode_1.el)("section", (0, skynode_1.el)("h4.section-title", "Lookup"), (0, skynode_1.el)("input", {
            change: (event, input) => {
                this.page = 1;
                const id = parseInt(input.domElement.value, 10);
                this.byId = isNaN(id) === true ? undefined : id;
                this.loadCases();
            },
        })), (0, skynode_1.el)("section", (0, skynode_1.el)("h4.section-title", "Sort By"), (0, skynode_1.el)("select", (0, skynode_1.el)("option", "Id - Low", { value: "id-low" }), (0, skynode_1.el)("option", "Id - High", { value: "id-high" }), (0, skynode_1.el)("option", "Rarity - High", { value: "rarity-high" }), (0, skynode_1.el)("option", "Rarity - Low", { value: "rarity-low" }), {
            change: (event, input) => {
                this.page = 1;
                this.sortBy = input.domElement.value;
                this.loadCases();
            },
        })), (0, skynode_1.el)("section", (0, skynode_1.el)("h4.section-title", "Page"), (0, skynode_1.el)(".page", this.pageDisplay = (0, skynode_1.el)("span"), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("a.prev-button", "Prev", {
            click: () => {
                if (this.page > 1) {
                    this.page -= 1;
                    this.loadCases();
                }
            },
        }), (0, skynode_1.el)("a.next-button", "Next", {
            click: () => {
                if (this.page < this.lastPage) {
                    this.page += 1;
                    this.loadCases();
                }
            },
        }))))), (0, skynode_1.el)(".properties", (0, skynode_1.el)("h4.section-title", "Properties"), ...Object.entries(rarity_json_1.default.traits).map(([key, values]) => {
            const select = (0, skynode_1.el)("select", {
                placeholder: key,
                change: (event, select) => {
                    const value = select.domElement.value;
                    Object.assign(this.filter, { [key]: value });
                    if (value === "") {
                        delete this.filter[key];
                        select.style({
                            "background-color": undefined,
                        });
                    }
                    else {
                        select.style({
                            "background-color": "rgba(255, 255, 255, 0.37)",
                        });
                    }
                    this.page = 1;
                    this.loadCases();
                },
            }, (0, skynode_1.el)("option", key, { value: "" }), ...Object.keys(values).filter((value) => value !== "").map((value) => (0, skynode_1.el)("option", `${value} (${rarity_json_1.default.traits[key][value].count})`, { value })));
            this.selects.push(select);
            return select;
        }), (0, skynode_1.el)("a.reset-button", "Reset", {
            click: () => {
                this.filter = {};
                for (const select of this.selects) {
                    select.domElement.value = "";
                    select.style({
                        "background-color": undefined,
                    });
                }
                this.page = 1;
                this.loadCases();
            },
        })), this.caseList = (0, skynode_1.el)(".case-list")));
        this.loadCases();
    }
    loadCases() {
        const tokens = [];
        let db = Array.from(database_json_1.default.entries());
        if (this.sortBy === "id-high") {
            db = db.reverse();
        }
        else if (this.sortBy === "rarity-high") {
            db.sort((a, b) => {
                return rarity_json_1.default.scores[b[0]] - rarity_json_1.default.scores[a[0]];
            });
        }
        else if (this.sortBy === "rarity-low") {
            db.sort((a, b) => {
                return rarity_json_1.default.scores[a[0]] - rarity_json_1.default.scores[b[0]];
            });
        }
        for (const [id, token] of db) {
            if (this.byId !== undefined) {
                if (id === this.byId) {
                    tokens.push({ id, token });
                }
            }
            else {
                let pass = true;
                if (Object.keys(this.filter).length > 0) {
                    for (const [key, value] of Object.entries(this.filter)) {
                        const attribute = token.attributes.find((a) => a.trait_type === key);
                        if (attribute !== undefined && attribute.value !== value) {
                            pass = false;
                        }
                    }
                }
                if (pass === true) {
                    tokens.push({ id, token });
                }
            }
        }
        this.lastPage = Math.ceil(tokens.length / 300);
        this.pageDisplay.empty().appendText(`${this.page} of ${this.lastPage}`);
        this.caseList.empty();
        for (const [index, info] of tokens.entries()) {
            if (index >= (this.page - 1) * 300 && index < this.page * 300) {
                this.caseList.append((0, skynode_1.el)(".case", (0, skynode_1.el)("h5", `Case #${info.id}`), (0, skynode_1.el)("p", info.token.text), (0, skynode_1.el)(".rarity", (0, skynode_1.el)("h6", "Rarity Score"), (0, skynode_1.el)("span", CommonUtil_1.default.numberWithCommas(String(rarity_json_1.default.scores[info.id]))))));
            }
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = AllCases;
//# sourceMappingURL=AllCases.js.map