"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Contract_1 = __importDefault(require("./Contract"));
class NFTContract extends Contract_1.default {
    constructor() {
        super("0x0af3f3fe9e822b7a740ca45ce170340b2da6f4cc", require("./NFTContractABI.json"));
    }
    async balanceOf(owner) {
        return ethers_1.BigNumber.from(await this.runMethod("balanceOf", owner));
    }
    async tokenOfOwnerByIndex(owner, index) {
        return ethers_1.BigNumber.from(await this.runMethod("tokenOfOwnerByIndex", owner, index));
    }
}
exports.default = new NFTContract();
//# sourceMappingURL=NFTContract.js.map