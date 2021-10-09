import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class AllCases implements View {

    private container: DomNode;
    private pageDisplay: DomNode;
    private page: number = 1;

    constructor() {
        Layout.current.content.append(this.container = el(".all-cases-view",
            el("header",
                el("section",
                    el("h4.section-title", "Lookup"),
                    el("input"),
                ),
                el("section",
                    el("h4.section-title", "Sort By"),
                    el("select",
                        el("option", "Id - Low"),
                        el("option", "Id - High"),
                        el("option", "Rarity - High"),
                        el("option", "Rarity - Low"),
                    ),
                ),
                el("section",
                    el("h4.section-title", "Page"),
                    el(".page",
                        this.pageDisplay = el("span", "1 of 34"),
                        el(".button-container",
                            el("a.prev-button", "Prev"),
                            el("a.next-button", "Next"),
                        ),
                    ),
                ),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
