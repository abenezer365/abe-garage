import express from "express";
import { activate, addService, deactivate, deleteService, editServices, getAllServices, getSingleService } from "../controller/service.controller.js";
import authorize from "../auth/authorize.middlewaire.js";
// Controllers
const router = express.Router();


router.post("/add_service", addService);
router.get("/services", getAllServices);
router.patch("/edit/:service_id", authorize('admin','manager'),editServices)
router.get("/service/:service_id", getSingleService);
router.delete("/delete/:service_id", deleteService )
router.patch("/deactivate/:service_id", authorize('admin'),deactivate )
router.patch("/activate/:service_id", authorize('admin'),activate )

export default router;



