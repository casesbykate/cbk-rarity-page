import { BigNumber } from "ethers";
import Contract from "./Contract";
declare class NFTContract extends Contract {
    constructor();
    balanceOf(owner: string): Promise<BigNumber>;
    tokenOfOwnerByIndex(owner: string, index: number): Promise<BigNumber>;
}
declare const _default: NFTContract;
export default _default;
//# sourceMappingURL=NFTContract.d.ts.map