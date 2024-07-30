import { Request, Response } from "express";
import { handleException } from "../handlers/exceptionHandler";
import { Prisma } from "@prisma/client";
import { PrismaClientInstance } from "../modules/prismaClient";
import handleSuccess from "../handlers/successHandler";

const prisma = PrismaClientInstance.getClient();

// This will create a room
export const createRoom = async (req: Request, res: Response) => {
    try {
        const data: Prisma.RoomCreateInput = req.body;
        const room = await prisma.room.create({ data });
        handleSuccess(res, 201, room);
    } catch (error) {
        handleException(res, error);
    }
};

// This will get all the rooms
export const getRooms = async (_req: Request, res: Response) => {
    try {
        const data = await prisma.room.findMany();
        handleSuccess(res, 200, data);
    } catch (error) {
        handleException(res, error);
    }
};

// This will get a single room
export const getRoom = async (req: Request, res: Response) => {
    try {
        const roomId = req.params.id;
        const room = await prisma.room.findUnique({ where: { id: roomId } });
        handleSuccess(res, 201, room);
    } catch (error) {
        handleException(res, error);
    }
};

// This will update a room
export const updateRoom = async (req: Request, res: Response) => {
    try {
        const roomId = req.params.id;
        const data: Prisma.RoomUpdateInput = req.body;
        await prisma.room.update({ where: { id: roomId }, data });
        handleSuccess(res, 201);
    } catch (error) {
        handleException(res, error);
    }
};

// This will delete a room
export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const roomId = req.params.id;
        await prisma.room.delete({ where: { id: roomId }});
        handleSuccess(res, 204);
    } catch(error) {
        handleException(res, error);
    }
};
