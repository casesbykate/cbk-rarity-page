import { SkyRouter } from "skyrouter";
import AllCases from "./view/AllCases";
import Layout from "./view/Layout";
import Lockable from "./view/Lockable";
import MyCases from "./view/MyCases";

(async () => {

    SkyRouter.route("**", Layout);
    SkyRouter.route("", AllCases);
    SkyRouter.route(["my-cases", "my-cases/{caseId}"], MyCases);
    SkyRouter.route("my-cases/{caseId}/lockable", Lockable);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();