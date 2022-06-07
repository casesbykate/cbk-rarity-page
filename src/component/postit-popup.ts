import { DomNode, el, Popup } from "@hanul/skynode";

export default class PostitPopup extends Popup {

    public content: DomNode;

    constructor(
    ) {
        super(".popup-background");
        this.append(
            this.content = el(".dialogue.postit-popup",
                el(".content",
                    el("p", "담배 한 대 말아 피워도 될까요?\n담배 종이 1장, 필터 1개, 담배잎 2장이 필요해요."),
                    el(".button-container",
                        el("a", "1)예, 그러시죠."),
                        el("a", "2)재료를 준비해서 다시 올게요.", {
                            click: () => {
                                this.delete();
                            }
                        }),
                    ),
                ),
            ),
        )
    }

    public delete() {
        super.delete();
    }
}