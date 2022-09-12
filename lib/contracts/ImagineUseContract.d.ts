import { BigNumberish } from "ethers";
import Contract from "./Contract";
declare class ImagineUseContract extends Contract {
    constructor();
    used(id: BigNumberish): Promise<boolean>;
    use(id: BigNumberish): Promise<void>;
}
declare const _default: ImagineUseContract;
export default _default;
//# sourceMappingURL=ImagineUseContract.d.ts.map