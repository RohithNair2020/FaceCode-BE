import axios from "axios"
import { Request, Response } from "express";
import handleSuccess from "../handlers/successHandler";
import { handleException } from "../handlers/exceptionHandler";

export const executeCode = async (req: Request, res: Response) => {
    try {
        const codeExecutionRequest = {
            ...req.body,
            clientId: process.env.JDOODLE_CLIENT_ID,
            clientSecret: process.env.JDOODLE_CLIENT_SECRET
        };

        const response = await axios.post(process.env.CODE_EXECUTION_URL!, codeExecutionRequest);
        handleSuccess(res, 201, response.data);
    } catch(e) {
        handleException(res, e);
    }
}