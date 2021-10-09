import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;
        BodyNode.append(this.container = el(".layout",
            el("header",
                el("h1", "Cases by Kate"),
                el("h2", "Rarity Table"),
                el(".menu",
                    el("a", "All Cases", { click: () => ViewUtil.go("/") }),
                    el("a", "My Cases", { click: () => ViewUtil.go("/my-cases") }),
                ),
            ),
            el("main",
                this.content = el(".content"),
            ),
            el("footer",
                el("a", el("img", { src: "/images/logo.png", height: "120" }), { href: "https://casesbykate.xyz/" }),
                el("a", el("img", { src: "/images/website.png", height: "40" }), { href: "https://casesbykate.xyz/" }),
                el("a", el("img", { src: "/images/opensea.png", height: "48" }), { href: "https://opensea.io/collection/cases-by-kate" }),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
