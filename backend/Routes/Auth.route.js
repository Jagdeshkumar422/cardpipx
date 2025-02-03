import express from "express";
import {
  deleteUser,
  getUser,
  register,
  signin,
  signout,
  updatePassword,
  updatePersonalInfo,
  getUserBalance,
  getAllUsers,
  deleteByAdmin,
} from "../Controller/Auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/getUserBalance/:id", getUserBalance);
router.put("/updatePersonalInfo/:id", updatePersonalInfo);
router.put("/updatePassword/:id", updatePassword);
router.get("/getUser/:id", getUser);
router.delete("/deleteUser/:id/:userPassword", deleteUser);
router.delete("/deleteByAdmin/:id", deleteByAdmin);
router.get("/getAllUsers", getAllUsers);

export default router;
