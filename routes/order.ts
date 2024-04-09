import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders, newPayment, sendStripePublishableKey } from "../controllers/order";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);

orderRouter.get(
  "/get-orders",
  
  isAuthenticated,
  authorizedRoles("admin"),
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey",sendStripePublishableKey);

orderRouter.post("/payment",isAuthenticated,newPayment);

export default orderRouter;
