import express from "express"
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout";
const layoutRouter = express.Router();

layoutRouter.post("/create-layout",isAuthenticated,authorizedRoles("admin"),createLayout);

layoutRouter.put("/edit-layout",isAuthenticated,authorizedRoles("admin"),editLayout);

layoutRouter.get("/fetch-layout/:type",getLayoutByType);



export default layoutRouter