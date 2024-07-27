import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import logger from "../winston";

const prisma = new PrismaClient();

// Create user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        if(!name || !email) {
            logger.error('Name and Email required for creating user');
            res.status(400).json({ status: false, error: "Name and Email required for creating user" });
        }

        const userData: { name: string; email: string } = {
            name,
            email,
        };

        await prisma.user.create({
            data: userData,
        });

        res.json({ status: true, name });
    } catch (error) {
        res.status(404).json({ status: false, error });
    }
};

// Gets all the users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    } catch (error) {
        res.status(404).json({ status: false, error });
    }
};

// Gets a user by the id
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

// Filter users
// Update user
// Delete user
