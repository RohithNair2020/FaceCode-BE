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
                roomSocket.emit("room-context", this._rooms.get(roomId) || []);

                this._createRoom(roomId)._addRoommate(roomId, {
                    userId: roommate.userId,
                    userInfo: roommate.userInfo
                });
                roomSocket.join(roomId);

                // Notify everyone that a new person has joined the meet
                roomSocket.to(roomId).emit("roommate-joined", roommate);
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
                roomSocket.to(roomId).emit("answer", { to, from, answer });
                logger.info(`${from} has an answer to ${to} in room ${roomId}`);
            });

            roomSocket.on(
                "ice-candidate",
                ({ roomId, from, to, candidate }) => {
                    roomSocket
                        .to(roomId)
                        .emit("ice-candidate", { from, to, candidate });
                    // logger.info(`New ICE Candidate from ${from}`);
                }
            );
        });
        logger.info("🚪Room Service Initialized");
    }

    private _createRoom(roomId: string) {
        if (this._rooms.has(roomId)) return this;
        this._rooms.set(roomId, { roommates: [] });
        return this;
    }

    private _deleteRoom(roomId: string) {
        this._rooms.delete(roomId);
        logger.info(`Everyone left Room - ${roomId} and is deleted`);
        return this;
    }

    private _addRoommate(roomId: string, roommate: any) {
        if (!this._rooms.has(roomId)) return this;

        const room = this._rooms.get(roomId);
        const { roommates } = room;

        if(roommates?.findIndex((mate: any) => mate.userId === roommate.userId) !== -1) return this;

        roommates.push(roommate);
        this._rooms.set(roomId, { ...room, roommates });

        return this;
    }

    private _removeRoommate(roomId: string, roommateId: any) {
        if (!this._rooms.has(roomId)) return this;

        const room = this._rooms.get(roomId);
        let { roommates } = room;
        roommates = roommates?.filter((mate: any) => mate.userId !== roommateId);

        this._rooms.set(roomId, { ...room, roommates });
        if (!roommates?.length) this._deleteRoom(roomId);
        return this;
    }
}

export default RoomService;
