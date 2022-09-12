"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Contract_1 = __importDefault(require("./Contract"));
class ImagineContract extends Contract_1.default {
    constructor() {
        super("0xbAE9f994511b2Be1187d2AaF261F294EBDfc891f", require("./ImagineABI.json"));
    }
    async balanceOf(owner, id) {
        return ethers_1.BigNumber.from(await this.runMethod("balanceOf", owner, id));
    }
    async isApprovedForAll(owner, operator) {
        return await this.runMethod("isApprovedForAll", owner, operator);
    }
    async setApprovalForAll(operator, approved) {
        await this.runWalletMethod("setApprovalForAll", operator, approved);
    }
}
exports.default = new ImagineContract();
//# sourceMappingURL=ImagineContract.js.map