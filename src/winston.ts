import { createLogger, format, transports } from "winston";

const { combine, timestamp, cli, colorize, align, printf } = format;
const timestampFormat = {
    format: "YYYY-MM-DD hh:mm:ss.SSS A", // 2022-01-25 03:23:10.350 PM
};

const logFormat = combine(
    colorize({ all: true }),
    timestamp(timestampFormat),
    align(),
    cli(),
    printf((info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`),
);

const logger = createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: combine(logFormat),
    transports: [new transports.Console()],
});

export default logger;
