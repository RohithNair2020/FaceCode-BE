import express from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from "../controllers/userController";
const router = express.Router();

// CREATE a user
router.post("/", createUser);

// GET all users
router.get("/", getUsers);

// GET single user
router.get("/:id", getUserById);

// UPDATE a user
router.patch("/:id", updateUser);

// DELETE a user
router.delete("/:id", deleteUser);

export default router;
