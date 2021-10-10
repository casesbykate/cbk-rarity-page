import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import database from "../database.json";
import rarity from "../rarity.json";
import Layout from "./Layout";

export default class AllCases implements View {

    private container: DomNode;
    private pageDisplay: DomNode;
    private caseList: DomNode;
    private selects: DomNode<HTMLSelectElement>[] = [];

    private byId: undefined | number;
    private filter: { [key: string]: string } = {};
    private sortBy = "id-low";
    private page: number = 1;
    private lastPage: number = 34;

    constructor() {
        Layout.current.content.append(this.container = el(".all-cases-view",
            el("header",
                el("section",
                    el("h4.section-title", "Lookup"),
                    el("input", {
                        change: (event, input) => {
                            this.page = 1;
                            const id = parseInt((input.domElement as HTMLInputElement).value, 10);
                            this.byId = isNaN(id) === true ? undefined : id;
                            this.loadCases();
                        },
                    }),
                ),
                el("section",
                    el("h4.section-title", "Sort By"),
                    el("select",
                        el("option", "Id - Low", { value: "id-low" }),
                        el("option", "Id - High", { value: "id-high" }),
                        el("option", "Rarity - High", { value: "rarity-high" }),
                        el("option", "Rarity - Low", { value: "rarity-low" }),
                        {
                            change: (event, input) => {
                                this.page = 1;
                                this.sortBy = (input.domElement as HTMLSelectElement).value;
                                this.loadCases();
                            },
                        },
                    ),
                ),
                el("section",
                    el("h4.section-title", "Page"),
                    el(".page",
                        this.pageDisplay = el("span"),
                        el(".button-container",
                            el("a.prev-button", "Prev", {
                                click: () => {
                                    if (this.page > 1) {
                                        this.page -= 1;
                                        this.loadCases();
                                    }
                                },
                            }),
                            el("a.next-button", "Next", {
                                click: () => {
                                    if (this.page < this.lastPage) {
                                        this.page += 1;
                                        this.loadCases();
                                    }
                                },
                            }),
                        ),
                    ),
                ),
            ),
            el(".properties",
                el("h4.section-title", "Properties"),
                ...Object.entries(rarity.traits).map(([key, values]) => {
                    const select = el("select",
                        {
                            placeholder: key,
                            change: (event, select) => {
                                const value = (select.domElement as HTMLSelectElement).value;
                                Object.assign(this.filter, { [key]: value });
                                if (value === "") {
                                    delete this.filter[key];
                                    select.style({
                                        "background-color": undefined,
                                    });
                                } else {
                                    select.style({
                                        "background-color": "rgba(255, 255, 255, 0.37)",
                                    });
                                }
                                this.page = 1;
                                this.loadCases();
                            },
                        },
                        el("option", key, { value: "" }),
                        ...Object.keys(values).filter((value) => value !== "").map((value) => el("option", `${value} (${(rarity.traits as any)[key][value].count})`, { value })),
                    );
                    this.selects.push(select as DomNode<HTMLSelectElement>);
                    return select;
                }),
                el("a.reset-button", "Reset", {
                    click: () => {
                        this.filter = {};
                        for (const select of this.selects) {
                            select.domElement.value = "";
                            select.style({
                                "background-color": undefined,
                            });
                        }
                        this.page = 1;
                        this.loadCases();
                    },
                }),
            ),
            this.caseList = el(".case-list"),
        ));
        this.loadCases();
    }

    private loadCases() {

        const tokens: any[] = [];
        let db: any[] = Array.from((database as any).entries());

        if (this.sortBy === "id-high") {
            db = db.reverse();
        } else if (this.sortBy === "rarity-high") {
            db.sort((a, b) => {
                return (rarity.scores as any)[b[0]] - (rarity.scores as any)[a[0]];
            });
        } else if (this.sortBy === "rarity-low") {
            db.sort((a, b) => {
                return (rarity.scores as any)[a[0]] - (rarity.scores as any)[b[0]];
            });
        }

        for (const [id, token] of db) {
            if (this.byId !== undefined) {
                if (id === this.byId) {
                    tokens.push({ id, token });
                }
            } else {
                let pass = true;
                if (Object.keys(this.filter).length > 0) {
                    for (const [key, value] of Object.entries(this.filter)) {
                        const attribute = token.attributes.find((a: any) => a.trait_type === key);
                        if (attribute !== undefined && attribute.value !== value) {
                            pass = false;
                        }
                    }
                }
                if (pass === true) {
                    tokens.push({ id, token });
                }
            }
        }

        this.lastPage = Math.ceil(tokens.length / 300);
        this.pageDisplay.empty().appendText(`${this.page} of ${this.lastPage}`);

        this.caseList.empty();
        for (const [index, info] of tokens.entries()) {
            if (index >= (this.page - 1) * 300 && index < this.page * 300) {
                this.caseList.append(el(".case",
                    el("h5", `Case #${info.id}`),
                    el("p", info.token.text),
                ));
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
