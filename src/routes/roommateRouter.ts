import express from "express";
import {
    createRoommate,
    deleteRoommate,
    getRoommate,
    getRoommates,
    updateRoommate,
} from "../controllers/roommateController";

const router = express.Router();

// CREATE a room
router.post("/", createRoommate);

// GET all rooms
router.get("/", getRoommates);

// GET a single room
router.get("/:id", getRoommate);

// UPDATE a room
router.patch("/:id", updateRoommate);

// DELETE a room
router.delete("/:id", deleteRoommate);

export default router;
