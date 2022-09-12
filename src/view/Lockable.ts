import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import CommonUtil from "../CommonUtil";
import ImagineContract from "../contracts/ImagineContract";
import ImagineUseContract from "../contracts/ImagineUseContract";
import NFTContract from "../contracts/NFTContract";
import database from "../database.json";
import Wallet from "../klaytn/Wallet";
import rarity from "../rarity.json";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Lockable implements View {

    private container: DomNode;
    private walletAddressDisplay: DomNode;
    private caseList: DomNode;
    private detail: DomNode;

    private currentId: number | undefined;
    private sortBy = "id-low";

    constructor(viewParams: ViewParams) {
        Layout.current.content.append(this.container = el(".lockable-view",
            // new PostitPopup(),
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

        if (viewParams.caseId !== undefined) {
            this.currentId = parseInt(viewParams.caseId, 10);
        }

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
                            //this.showDetail(caseId);
                            ViewUtil.go(`/my-cases/${caseId}`);
                        },
                    }),
                );
            }

            if (cases.length > 0) {
                if (this.currentId !== undefined) {
                    this.showDetail(this.currentId);
                } else {
                    this.showDetail(cases[0]);
                }
            }
        }
    }

    private async showDetail(caseId: number) {
        this.currentId = caseId;
        const token: any = (database as any)[caseId];

        const used = await ImagineUseContract.used(caseId);

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
            used === true ? el(".lockable-contents",
                el(".title", el("p", "Lockable\nContents")),
                el("a.contents", el("img", { src: `https://storage.googleapis.com/cbk-nft/pfp/${caseId}.png` }), {
                    href: `https://storage.googleapis.com/cbk-nft/pfp/${caseId}.png`,
                    target: "_blank",
                }),
            ) : el(".unlocked",
                el("main",
                    el("section",
                        el("p", "담배 한 대 말아 피워도 될까요?\n담배 종이 1장, 필터 1개, 담배잎 2장이 필요해요.\n* 최초 사용시에는 2번의 트랜잭션이 필요합니다."),
                        el("a", "1) 예, 그러시죠.", {
                            click: async () => {
                                // check counts
                                const addr = await Wallet.loadAddress();
                                if (addr !== undefined) {
                                    if ((await ImagineContract.balanceOf(addr, 0)).lt(2)) {
                                        alert("담배잎이 부족합니다.");
                                    } else if ((await ImagineContract.balanceOf(addr, 1)).lt(1)) {
                                        alert("필터가 부족합니다.");
                                    } else if ((await ImagineContract.balanceOf(addr, 2)).lt(1)) {
                                        alert("담배 종이가 부족합니다.");
                                    } else {
                                        await ImagineUseContract.use(caseId);
                                        setTimeout(() => SkyRouter.refresh(), 2000);
                                    }
                                }
                            },
                        }),
                        el("a", "2) 재료를 준비해서 다시 올게요.", {
                            click: () => ViewUtil.go(`/my-cases/${caseId}`),
                        }),
                    ),
                ),
            ),
            el("a.lockable",
                el("img", { src: "/images/lockable.png", width: "209px" }),
                el("h4", "Lockable\nContents"),
                {
                    click: () => ViewUtil.go(`/my-cases/${caseId}`),
                },
            ),
        );
    }

    public changeParams(params: ViewParams, uri: string): void {
        if (params.caseId !== undefined) {
            this.showDetail(parseInt(params.caseId, 10));
        }
    }

    public close(): void {
        this.container.delete();
    }
}
