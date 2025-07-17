import express from "express";
import { addVehicle, deleteVehicle, editVehicle, getAllVehicleForOneCustomer, getAllVehicles, getSingleVehicle } from "../controller/vehicle.controller.js";
// Controllers
const router = express.Router();


router.post("/add_vehicle", addVehicle);
router.get("/vehicles", getAllVehicles);
router.get("/vehicle/:vehicle_id", getSingleVehicle);
router.get("/vehicles/:customer_id", getAllVehicleForOneCustomer);
router.patch("/edit/:vehicle_id", editVehicle)
router.delete("/delete/:vehicle_id", deleteVehicle )


export default router;



