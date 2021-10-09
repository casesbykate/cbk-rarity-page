import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";

export default class MyCases implements View {

    private container: DomNode;

    constructor() {
        Layout.current.content.append(this.container = el(".my-cases-view",
        ));

        this.load();
    }

    private async load() {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
