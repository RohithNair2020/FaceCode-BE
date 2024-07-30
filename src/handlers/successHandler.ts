import { Response } from "express";

export default function (res: Response, statusCode: number = 200, data?: any) {
    res.status(statusCode).json({ status: true, payload:data });
}