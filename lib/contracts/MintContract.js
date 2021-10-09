"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Contract_1 = __importDefault(require("./Contract"));
class MintContract extends Contract_1.default {
    constructor() {
        super("0xdAf312BFEb1d03b87F213DA3FC3ceADC220cd92e", require("./MintContractABI.json"));
    }
    async mint(to, count) {
        await this.runWalletMethodWithValue(ethers_1.utils.parseEther(String(20 * count)), "mint", to, count);
    }
}
exports.default = new MintContract();
//# sourceMappingURL=MintContract.js.map