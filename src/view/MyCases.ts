import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import NFTContract from "../contracts/NFTContract";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";
import database from "../database.json";
import rarity from "../rarity.json";
import CommonUtil from "../CommonUtil";

export default class MyCases implements View {

    private container: DomNode;
    private walletAddressDisplay: DomNode;
    private caseList: DomNode;
    private detail: DomNode;

    private sortBy = "id-low";

    constructor() {
        Layout.current.content.append(this.container = el(".my-cases-view",
            el("header",
                el("section",
                    el("h4.section-title", "Wallet Connect"),
                    this.walletAddressDisplay = el(".wallet-address"),
                ),
            ),
            el(".case-container",
                el("h4", "My Cases"),
                el("select",
                    el("option", "Sort By", { value: "id-low" }),
                    el("option", "Id - Low", { value: "id-low" }),
                    el("option", "Id - High", { value: "id-high" }),
                    el("option", "Rarity - High", { value: "rarity-high" }),
                    el("option", "Rarity - Low", { value: "rarity-low" }),
                    {
                        change: (event, input) => {
                            this.sortBy = (input.domElement as HTMLSelectElement).value;
                            this.load();
                        },
                    },
                ),
                this.caseList = el(".case-list"),
            ),
            this.detail = el("main"),
        ));

        this.load();
    }

    private async load() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.walletAddressDisplay.empty().appendText(address);

            const balance = (await NFTContract.balanceOf(address)).toNumber();
            let cases: number[] = [];

            const promises: Promise<void>[] = [];
            for (let i = 0; i < balance; i += 1) {
                const promise = async (index: number) => {
                    const mateId = (await NFTContract.tokenOfOwnerByIndex(address, index)).toNumber();
                    cases.push(mateId);
                };
                promises.push(promise(i));
            }
            await Promise.all(promises);

            if (this.sortBy === "id-high") {
                cases = cases.reverse();
            } else if (this.sortBy === "rarity-high") {
                cases.sort((a, b) => {
                    return (rarity.scores as any)[b] - (rarity.scores as any)[a];
                });
            } else if (this.sortBy === "rarity-low") {
                cases.sort((a, b) => {
                    return (rarity.scores as any)[a] - (rarity.scores as any)[b];
                });
            }

            this.caseList.empty();
            for (const caseId of cases) {
                this.caseList.append(
                    el("a.case", `Case #${caseId}`, {
                        click: () => {
                            this.showDetail(caseId);
                        },
                    }),
                );
            }

            if (cases.length > 0) {
                this.showDetail(cases[0]);
            }
        }
    }

    private showDetail(caseId: number) {
        const token: any = (database as any)[caseId];
        this.detail.empty().append(
            el(".case-container",
                el(".case",
                    el("h5", `Case #${caseId}`),
                    el("p", token.text),
                ),
                el(".score",
                    el("h5", "Rarity Score"),
                    el("span", CommonUtil.numberWithCommas(String((rarity.scores as any)[caseId]))),
                ),
                el("a.opensea-button", "View on Opensea", {
                    href: `https://opensea.io/assets/klaytn/0x0af3f3fe9e822b7a740ca45ce170340b2da6f4cc/${caseId}`,
                    target: "_blank",
                }),
            ),
            el(".properties",
                ...Object.keys(rarity.traits).map((key) => el(".property",
                    el("h5", key),
                    el("span", token.attributes.find((a: any) => a.trait_type === key).value),
                )),
            ),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
