"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyrouter_1 = require("skyrouter");
const AllCases_1 = __importDefault(require("./view/AllCases"));
const Layout_1 = __importDefault(require("./view/Layout"));
const MyCases_1 = __importDefault(require("./view/MyCases"));
(async () => {
    skyrouter_1.SkyRouter.route("**", Layout_1.default);
    skyrouter_1.SkyRouter.route("", AllCases_1.default);
    skyrouter_1.SkyRouter.route("my-cases", MyCases_1.default);
    if (sessionStorage.__spa_path) {
        skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
//# sourceMappingURL=main.js.map