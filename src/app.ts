import express, { Express } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config(); // Don't move this down. This initializes the env variables
import logger from './winston';
import morganConfig from './morgan-config';
import appRouter from './routes/appRouter';
import userRouter from './routes/userRouter';
import roomRouter from './routes/roomRouter'
import roommateRouter from './routes/roommateRouter';

// Creating an express app
const app: Express = express();

app.use(cors({
  origin: ['http://localhost:5173']
}));
app.use(express.json({ type: "application/json" })); // express middleware for parsing the incoming requests
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(morganConfig);   // For server logs

// Setting the routes
app.use('/api', appRouter);
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/roommates', roommateRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  logger.info(`🚀 Server listening at PORT :: ${PORT}`);
});
