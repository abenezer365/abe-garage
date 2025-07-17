import express from "express";
// Controllers
import {activate, checkUser, deactivate, deleteUser, editProfile, getAllUsers, getSingleUser, add_user, login} from '../controller/user.controller.js'
import auth from "../auth/auth.middlewaire.js";
const router = express.Router();


router.post("/login", login);
router.post("/add_user", add_user);
router.patch("/edit",auth , editProfile)
router.get("/check", auth, checkUser )
router.get("/users",auth, getAllUsers )
router.get("/user/:user_id",auth, getSingleUser )
router.patch("/deactivate/:user_id",auth, deactivate )
router.patch("/activate/:user_id",auth, activate )
router.delete("/delete/:user_id",auth, deleteUser )

export default router;
