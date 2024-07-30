import { PrismaClient } from "@prisma/client";

export class PrismaClientInstance {
    private static instance: null | PrismaClient = null;
    constructor() {}

    static getClient = (): PrismaClient => {
        if (!PrismaClientInstance.instance) {
            PrismaClientInstance.instance = new PrismaClient();
        }
        return PrismaClientInstance.instance;
    };
}
