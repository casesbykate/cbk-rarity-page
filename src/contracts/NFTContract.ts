import { BigNumber } from "ethers";
import Contract from "./Contract";

class NFTContract extends Contract {

    constructor() {
        super("0x0af3f3fe9e822b7a740ca45ce170340b2da6f4cc", require("./NFTContractABI.json"));
    }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("balanceOf", owner));
    }
}

export default new NFTContract();
