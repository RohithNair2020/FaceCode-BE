import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "../winston";
// import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

io.on("connection", (socket) => {
    logger.info("New socket Connection");

    socket.on("new-joinee", (msg) => {
        console.log("A New Room Joinee :: ", msg);
    });
});

server.listen(process.env.WS_PORT, () => {
    logger.info(
        `🚀 Websocket for Rooms listening at port :: ${process.env.WS_PORT}`
    );
});
