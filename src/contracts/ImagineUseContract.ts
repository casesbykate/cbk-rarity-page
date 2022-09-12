import { BigNumberish } from "ethers";
import Wallet from "../klaytn/Wallet";
import Contract from "./Contract";
import ImagineContract from "./ImagineContract";

class ImagineUseContract extends Contract {

    constructor() {
        super("0xe8e28A6Dd0Fe83153F472A4F5546069068282F23", require("./ImagineUseABI.json"));
    }

    public async used(id: BigNumberish): Promise<boolean> {
        return await this.runMethod("used", id);
    }

    public async use(id: BigNumberish): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if (await ImagineContract.isApprovedForAll(owner, this.address) !== true) {
                await ImagineContract.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("use", id);
        }
    }
}

export default new ImagineUseContract();
