import express from "express";
import {
  AdminLogin,
  AdminRegister,
} from "../controllers/Authetication.controller.js";

const router = express.Router();

router.post("/login", AdminLogin);
router.post("/register", AdminRegister);

export default router;
