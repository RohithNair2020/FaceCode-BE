import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { handleException } from "../handlers/exceptionHandler";
import { PrismaClientInstance } from "../modules/prismaClient";
import handleSuccess from "../handlers/successHandler";

const prisma = PrismaClientInstance.getClient();

// This will create a user
export const createUser = async (req: Request, res: Response) => {
    const data: Prisma.UserCreateInput = req.body;
    try {
        const user = await prisma.user.create({ data });
        handleSuccess(res, 201, user);
    } catch (error: any) {
        handleException(res, error);
    }
};

// This will get all the users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const filters: Record<string, any> = {};
        const queryParams = req.query;

        Object.keys(queryParams).forEach((key) => {
            if (queryParams[key] != null) filters[key] = queryParams[key];
        });

        const data = await prisma.user.findMany({ where: filters });
        handleSuccess(res, 200, data);
    } catch (error: any) {
        handleException(res, error);
    }
};

// This will get a single user
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        handleSuccess(res, 200, user);
    } catch (error: any) {
        handleException(res, error);
    }
};

// This will update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const data: Prisma.UserUpdateInput = req.body;
        const userId = req.params.id;

        await prisma.user.update({ where: { id: Number(userId) }, data });
        handleSuccess(res, 201);
    } catch (error: any) {
        handleException(res, error);
    }
};

// This will delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({ where: { id: Number(id) } });
        handleSuccess(res, 204);
    } catch (error: any) {
        handleException(res, error);
    }
};

// This will get all the rooms the user is part of
export const getUserRooms = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await prisma.roommate.findMany({
            where: { userId: Number(id) },
        });
        handleSuccess(res, 200, data);
    } catch (error) {
        handleException(res, error);
    }
};
