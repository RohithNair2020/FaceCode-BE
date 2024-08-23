import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaClientInstance } from "../modules/prismaClient";
import handleSuccess from "../handlers/successHandler";
import { handleException } from "../handlers/exceptionHandler";

const prisma = PrismaClientInstance.getClient();

// This will create a roommate
export const createRoommate = async (req: Request, res: Response) => {
    try {
        const roommateQuery: Prisma.RoommateWhereInput = req.body;

        const existingRoommates = await prisma.roommate.findMany({
            where: {
                roomId: roommateQuery.roomId,
                userId: roommateQuery.userId,
            },
        });

        if (existingRoommates && existingRoommates.length) {
            handleSuccess(res, 201, { roommate: existingRoommates[0] });
        } else {
            const data: Prisma.RoommateCreateInput = req.body;
            const roommate = await prisma.roommate.create({ data });
            handleSuccess(res, 201, { roommate });
        }
    } catch (error) {
        handleException(res, error);
    }
};

// This will get all the roommates
export const getRoommates = async (_req: Request, res: Response) => {
    try {
        const roommates = await prisma.roommate.findMany();
        handleSuccess(res, 200, roommates);
    } catch (error) {
        handleException(res, error);
    }
};

// This will get a single roommate
export const getRoommate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await prisma.roommate.findUnique({ where: { id } });
        handleSuccess(res, 200, data);
    } catch (error) {
        handleException(res, error);
    }
};

// This will update a roommate
export const updateRoommate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data: Prisma.RoommateUpdateInput = req.body;
        await prisma.roommate.update({ where: { id }, data });
        handleSuccess(res, 201);
    } catch (error) {
        handleException(res, error);
    }
};

// This will delete a roommate
export const deleteRoommate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.roommate.delete({ where: { id } });
        handleSuccess(res, 204);
    } catch (error) {
        handleException(res, error);
    }
};
