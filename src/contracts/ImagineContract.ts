import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";

class ImagineContract extends Contract {

    constructor() {
        super("0xbAE9f994511b2Be1187d2AaF261F294EBDfc891f", require("./ImagineABI.json"));
    }

    public async balanceOf(owner: string, id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("balanceOf", owner, id));
    }

    public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return await this.runMethod("isApprovedForAll", owner, operator);
    }

    public async setApprovalForAll(operator: string, approved: boolean) {
        await this.runWalletMethod("setApprovalForAll", operator, approved);
    }
}

export default new ImagineContract();
