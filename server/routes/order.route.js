import express from "express";
import { getAllOrders, addOrder, getSingleOrder, getAllOrderForOneCustomer, updateStatus, deleteOrder, addOrderInfo, getOrderByHash } from "../controller/order.controller.js";
// Controllers
const router = express.Router();


router.post("/add_order", addOrder);
router.post("/add_order_info", addOrderInfo);
router.get("/orders", getAllOrders);
router.get("/order/:order_id", getSingleOrder);
router.get("/my_order/:order_hash", getOrderByHash);
router.get("/orders/:customer_id", getAllOrderForOneCustomer);
router.patch("/update_status/:order_id", updateStatus )
router.delete("/delete/:order_id", deleteOrder)


export default router;