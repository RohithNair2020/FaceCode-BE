import express, { Express } from "express";
import cors from "cors";
import { config } from "dotenv";
config(); // Don't move this down. This initializes the env variables
import logger from "./winston";
import morganConfig from "./morgan-config";
import appRouter from "./routes/appRouter";
import userRouter from "./routes/userRouter";
import roomRouter from "./routes/roomRouter";
import roommateRouter from "./routes/roommateRouter";
import { createServer } from "http";
import { Server } from "socket.io";
import RoomService from "./services/RoomService";

// Creating an express app and it's crucial to
const app: Express = express();

app.use(
    cors({
        origin: [process.env.CLIENT_URL || "*"],
    })
);
app.use(express.json({ type: "application/json" })); // express middleware for parsing the incoming requests
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(morganConfig); // For server logs

// Setting the routes
app.use("/api", appRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/roommates", roommateRouter);

// Creating websocket
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

const roomService = new RoomService();
roomService.initializeRoom(io);

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    logger.info(`🚀 App server listening at PORT :: ${PORT}`);
    logger.info(`🚀 Socket server listening at PORT :: ${PORT}`);
});

