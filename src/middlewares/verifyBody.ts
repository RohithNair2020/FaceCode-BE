import { NextFunction, Request, Response } from "express";
import logger from "../winston";

const verifyBody = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.method === "POST") {
            JSON.parse(req.body);
        }
        next();
    } catch (error) {
        logger.error("Invalid request body :: Not a JSON");
        res.status(404).json({ status: false, error: "Invalid request body" });
    }
};

export default verifyBody;
