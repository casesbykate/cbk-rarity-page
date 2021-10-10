import { SkyRouter } from "skyrouter";
import AllCases from "./view/AllCases";
import Layout from "./view/Layout";
import MyCases from "./view/MyCases";

(async () => {

    SkyRouter.route("**", Layout);
    SkyRouter.route("", AllCases);
    SkyRouter.route("my-cases", MyCases);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();