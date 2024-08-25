import { Server } from "socket.io";
import logger from "../winston";

class RoomService {
    private _rooms: Map<string, any> = new Map();

    constructor() {}

    initializeRoom(io: Server) {
        io.on("connection", (roomSocket) => {
            logger.warn(":: SOCKET :: CONNECTED ::");
            // When someonejoins the room, add the room to the rooms if not added and create a dedicated socket room
            roomSocket.on("roommate-join", (roommate: any) => {
                const roomId = roommate.roomId;

                // Send the details of the existing roommates to the new joinee
                roomSocket.emit("room-context", this._rooms.get(roomId));

                this._createRoom(roomId)._addRoommate(roomId, {
                    userId: roommate.userId,
                });
                roomSocket.join(roomId);

                // Notify everyone that a new person has joined the meet
                roomSocket.to(roomId)
                    .emit("roommate-joined", roommate);

            });

            roomSocket.on("roommate-exit", (roommate) => {
                logger.info("Roommate exited :: " + JSON.stringify(roommate));
                this._removeRoommate(roommate.roomId, roommate.userId);
                roomSocket.join(roommate.roomId);
                roomSocket
                    .to(roommate.roomId)
                    .emit("roommate-exited", roommate);
            });

            roomSocket.on("offer", ({ roomId, from, to, offer }) => {
                roomSocket.join(roomId);
                roomSocket.to(roomId).emit("offer", { from, to, offer });
                logger.info(`${from} has an offer for ${to}`);
            });

            // When an answer is recieved from a joinee
            roomSocket.on("answer", ({ roomId, from, to, answer }) => {
                roomSocket.join(roomId); // Check if this really necessary later
                roomSocket.to(roomId)
                    .emit("answer", { to, from, answer });
                logger.info(`${from} has an answer to ${to} in room ${roomId}`);
            });

            roomSocket.on("ice-candidate", ({ roomId, from, to, candidate }) => {
                roomSocket.to(roomId)
                    .emit("ice-candidate", { from, to, candidate });
                // logger.info(`New ICE Candidate from ${from}`);
            });
        });
        logger.info("🚪Room Service Initialized");
    }

    private _createRoom(roomId: string) {
        if (this._rooms.get(roomId)) return this;
        this._rooms.set(roomId, { roommates: [] });
        return this;
    }

    // private _deleteRoom(roomId: string) {
    //     this._rooms.delete(roomId);
    //     return this;
    // }

    private _addRoommate(roomId: string, roommate: any) {
        if (!this._rooms.get(roomId)) {
            logger.error("No room found with the mentioned Room ID");
            return this;
        }
        if (
            this._rooms
                .get(roomId)
                ?.roommates?.find(
                    (mate: any) => mate.userId === roommate.userId
                )
        )
            return this;
        this._rooms.get(roomId)?.roommates.push(roommate);
        return this;
    }

    private _removeRoommate(roomId: string, roommate: any) {
        if (!this._rooms.get(roomId)) return this;

        const roommateId = roommate.userId;
        let roommates = this._rooms.get(roomId).roommates;
        roommates = roommates.filter((mate: any) => mate.userId !== roommateId);
        return this;
    }
}

export default RoomService;
