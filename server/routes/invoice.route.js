import express from "express";
import { generateInvoice, markPayed, markUnpaid, sendInvoice } from "../controller/invoice.controller.js";
// Controllers
const router = express.Router();

router.post("/generate_invoice/:order_id", generateInvoice);
router.get("/send_invoice/:order_id", sendInvoice);
router.patch("/mark_payed/:order_id", markPayed );
router.patch("/mark_unpaid/:order_id", markUnpaid );


export default router;