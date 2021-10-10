import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";

export default class MyCases implements View {

    private container: DomNode;
    private walletAddressDisplay: DomNode;

    constructor() {
        Layout.current.content.append(this.container = el(".my-cases-view",
            el("header",
                el("section",
                    el("h4.section-title", "Wallet Connect"),
                    this.walletAddressDisplay = el(".wallet-address"),
                ),
            ),
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
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
