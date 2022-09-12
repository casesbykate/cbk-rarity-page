import { View, ViewParams } from "skyrouter";
export default class MyCases implements View {
    private container;
    private walletAddressDisplay;
    private caseList;
    private detail;
    private currentId;
    private sortBy;
    constructor(viewParams: ViewParams);
    private load;
    private showDetail;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=MyCases.d.ts.map