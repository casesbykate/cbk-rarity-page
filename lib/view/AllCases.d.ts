import { View, ViewParams } from "skyrouter";
export default class AllCases implements View {
    private container;
    private pageDisplay;
    private caseList;
    private selects;
    private byId;
    private filter;
    private sortBy;
    private page;
    private lastPage;
    constructor();
    private loadCases;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=AllCases.d.ts.map