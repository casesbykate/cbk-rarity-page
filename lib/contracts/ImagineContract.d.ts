import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
declare class ImagineContract extends Contract {
    constructor();
    balanceOf(owner: string, id: BigNumberish): Promise<BigNumber>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
    setApprovalForAll(operator: string, approved: boolean): Promise<void>;
}
declare const _default: ImagineContract;
export default _default;
//# sourceMappingURL=ImagineContract.d.ts.map