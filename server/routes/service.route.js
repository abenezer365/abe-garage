import express from "express";
import { activate, addService, deactivate, deleteService, editServices, getAllServices, getSingleService } from "../controller/service.controller.js";
// Controllers
const router = express.Router();


router.post("/add_service", addService);
router.get("/services", getAllServices);
router.patch("/edit/:service_id", editServices)
router.get("/service/:service_id", getSingleService);
router.delete("/delete/:service_id", deleteService )
router.patch("/deactivate/:service_id", deactivate )
router.patch("/activate/:service_id", activate )

export default router;



