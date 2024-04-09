import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { getNotifications, updateNotification } from "../controllers/notification";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-notifications",
 
  isAuthenticated,
  authorizedRoles("admin"),
  getNotifications
);

notificationRouter.put(
    "/update-notification/:id",
   
    isAuthenticated,
    authorizedRoles("admin"),
    updateNotification,
  );
  

export default notificationRouter;
