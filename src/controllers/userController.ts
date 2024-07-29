import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { exceptionHandler } from "../handlers/exceptionHandler";
// import logger from "../winston";

const prisma = new PrismaClient();

// This will create a user
export const createUser = async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    const data: Prisma.UserCreateInput = {
        name,
        email,
        phone,
    };

    try {
        await prisma.user.create({ data });
        res.status(201).json({ status: true, name });
    } catch (error) {
        const exception = exceptionHandler(error as { code: string });
        res.status(exception.statusCode).json({
            status: false,
            error: exception.message,
        });
    }
};

// This will get all the users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    } catch (error) {
        res.status(404).json({ status: false, error });
    }
};

// This will get a single user
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        res.json(user);
    } catch (error) {
        res.status(404).json({ status: false, error });
    }
};

// This will update a user
export const updateUser = (_req: Request, _res: Response) => {};

// This will delete a user
export const deleteUser = (_req: Request, _res: Response) => {};
