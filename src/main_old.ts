import { BodyNode, DomNode, el } from "@hanul/skynode";
import rarity from "./rarity.json";

(async () => {

    const scores = Object.entries(rarity.scores);
    scores.sort((a, b) => b[1] - a[1]);

    let rankDisplay: DomNode;
    let traitDisplay: DomNode;
    BodyNode.append(
        el("h1", "Cases by Kate Rarity Table"),
        el(".total-count", `Total: ${String(rarity.totalCount)}`),
        el("main",
            el(".rank",
                el("table",
                    el("thead",
                        el("tr",
                            el("th", "Rank"),
                            el("th", "ID"),
                            el("th", "Score"),
                        ),
                    ),
                    rankDisplay = el("tbody"),
                ),
            ),
            el(".trait",
                el("table",
                    el("thead",
                        el("tr",
                            el("th", "종류"),
                            el("th", "값"),
                            el("th", "개수"),
                            el("th", "퍼센트"),
                            el("th", "점수"),
                            el("th", "목록"),
                        ),
                    ),
                    traitDisplay = el("tbody"),
                ),
            ),
        ),
    );

    for (const [rank, score] of scores.entries()) {
        rankDisplay.append(el("tr",
            el("td", String(rank + 1)),
            el("td", score[0]),
            el("td", String(score[1])),
        ));
    }

    for (const [category, traits] of Object.entries(rarity.traits)) {
        for (const [trait, info] of Object.entries(traits)) {
            if (info.count > 0) {
                traitDisplay.append(el("tr",
                    el("td", category),
                    el("td", trait),
                    el("td", String(info.count)),
                    el("td", String(info.percent)),
                    el("td", String(info.score)),
                    el("td", el(".ids", info.ids.join(", "), {
                        style: {
                            height: 100,
                            overflow: "auto",
                        },
                    })),
                ));
            }
        }
    }
})();