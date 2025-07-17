import express from "express";
// Controllers
import { activate, addCustomer, deactivate, deleteCustomer, editProfile, getAllCustomers, getSingleCustomer } from "../controller/customer.controller.js";
const router = express.Router();


router.post("/add_customer", addCustomer);
router.get("/customers", getAllCustomers);
router.patch("/edit/:customer_id", editProfile)
router.get("/customer/:customer_id", getSingleCustomer);
router.patch("/deactivate/:customer_id", deactivate )
router.patch("/activate/:customer_id", activate )
router.delete("/delete/:customer_id", deleteCustomer )

export default router;