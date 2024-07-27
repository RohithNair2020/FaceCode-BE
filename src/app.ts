import express, { Express } from 'express';
import { config } from 'dotenv';
config(); // Don't move this down. This initializes the env variables
import logger from './winston';
import morganConfig from './morgan-config';
import appRouter from './routes/appRouter';
import userRouter from './routes/userRouter';
import verifyBody from './middlewares/verifyBody';

// Creating an express app
const app: Express = express();

app.use(verifyBody); // Do not move this down
app.use(express.json()); // express middleware for parsing the incoming requests
app.use(morganConfig);   // For server logs

// Setting the routes
app.use('/api', appRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  logger.info(`🚀 Server listening at PORT :: ${PORT}`);
});
