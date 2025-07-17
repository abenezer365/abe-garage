import express from "express";
// Controllers
import { activate, addCustomer, deactivate, deleteCustomer, editProfile, getAllCustomers, getSingleCustomer } from "../controller/customer.controller.js";
import authorize from "../auth/authorize.middlewaire.js";
const router = express.Router();


router.post("/add_customer", authorize('admin'),addCustomer);
router.get("/customers", getAllCustomers);
router.patch("/edit/:customer_id", editProfile)
router.get("/customer/:customer_id", getSingleCustomer);
router.patch("/deactivate/:customer_id",authorize('admin'), deactivate )
router.patch("/activate/:customer_id",authorize('admin'), activate )
router.delete("/delete/:customer_id", authorize('admin'),deleteCustomer )

export default router;