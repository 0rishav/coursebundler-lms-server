"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const layout_1 = require("../controllers/layout");
const layoutRouter = express_1.default.Router();
layoutRouter.post("/create-layout", auth_1.isAuthenticated, (0, auth_1.authorizedRoles)("admin"), layout_1.createLayout);
layoutRouter.put("/edit-layout", auth_1.isAuthenticated, (0, auth_1.authorizedRoles)("admin"), layout_1.editLayout);
layoutRouter.get("/fetch-layout/:type", layout_1.getLayoutByType);
exports.default = layoutRouter;
