import express from "express";
import {
    getRooms,
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom,
    getRoomRoommates,
} from "../controllers/roomController";

const router = express.Router();

// CREATE a room
router.post("/", createRoom);

// GET all rooms
router.get("/", getRooms);

// GET a single room
router.get("/:id", getRoom);

// UPDATE a room
router.patch("/:id", updateRoom);

// DELETE a room
router.delete("/:id", deleteRoom);

// GET all roommates assigned to a room
router.get('/:id/roommates', getRoomRoommates);

export default router;
