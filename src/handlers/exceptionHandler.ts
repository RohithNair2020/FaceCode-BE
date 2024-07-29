type ExceptionDetail = {
    message: string;
    statusCode: number;
};

const exceptions: Record<string, ExceptionDetail> = {
    P1000: {
        message: "Unauthorized",
        statusCode: 401,
    },
    P1001: {
        message: "Something went wrong",
        statusCode: 500,
    },
    P1002: {
        message: "Request timed out",
        statusCode: 408,
    },
    P2002: {
        message: "Resource already exists",
        statusCode: 409,
    },
    P1010: {
        message: "Database Unauthorized",
        statusCode: 401,
    },
    P2012: {
        message: "Bad Request",
        statusCode: 400,
    },
    P2013: {
        message: "Bad Request",
        statusCode: 400,
    },
};

export const exceptionHandler = (error: { code: string }): ExceptionDetail => {
    const defaultException = {
        message: "Something went wrong",
        statusCode: 500,
    };

    return exceptions[error.code] || defaultException;
};
