import express from "express";
// Controllers
import {activate, checkUser, deactivate, deleteUser, editProfile, getAllUsers, getSingleUser, add_user, login} from '../controller/user.controller.js'
import authenticate from "../auth/authenticate.middlewaire.js";
import authorize from "../auth/authorize.middlewaire.js";
const router = express.Router();


router.post("/login", login);
router.post("/add_user", authenticate,authorize('admin'), add_user);
router.patch("/edit",authenticate , editProfile)
router.get("/check", authenticate, checkUser )
router.get("/users",authenticate, getAllUsers )
router.get("/user/:user_id",authenticate, getSingleUser )
router.patch("/deactivate/:user_id",authenticate, authorize('admin'),deactivate )
router.patch("/activate/:user_id",authenticate,authorize('admin'), activate )
router.delete("/delete/:user_id",authenticate,authorize('admin'), deleteUser )

export default router;
