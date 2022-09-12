"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Contract_1 = __importDefault(require("./Contract"));
const ImagineContract_1 = __importDefault(require("./ImagineContract"));
class ImagineUseContract extends Contract_1.default {
    constructor() {
        super("0xe8e28A6Dd0Fe83153F472A4F5546069068282F23", require("./ImagineUseABI.json"));
    }
    async used(id) {
        return await this.runMethod("used", id);
    }
    async use(id) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if (await ImagineContract_1.default.isApprovedForAll(owner, this.address) !== true) {
                await ImagineContract_1.default.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("use", id);
        }
    }
}
exports.default = new ImagineUseContract();
//# sourceMappingURL=ImagineUseContract.js.map