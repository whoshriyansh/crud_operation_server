import express from "express";
import {
  getUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
} from "../controllers/User.controller.js";
import { protect } from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.route("/").get(protect, getUsers).post(protect, createUser);
router
  .route("/:id")
  .get(protect, getUserById)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

export default router;
