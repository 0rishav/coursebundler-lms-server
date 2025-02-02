import express from "express"
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { getCoursesAnalytics, getOrdersAnalytics, getUserAnalytics } from "../controllers/analytics";
const analyticsRouter = express.Router();

analyticsRouter.get("/get-users-analytics",isAuthenticated,authorizedRoles("admin"),getUserAnalytics)

analyticsRouter.get("/get-courses-analytics",isAuthenticated,authorizedRoles("admin"),getCoursesAnalytics)

analyticsRouter.get("/get-orders-analytics",isAuthenticated,authorizedRoles("admin"),getOrdersAnalytics)




export default analyticsRouter;