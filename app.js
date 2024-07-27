import express from 'express';
import { config } from 'dotenv';
import morganConfig from './morgan-config.js';
import appRouter from './routes/appRouter.js';
import userRouter from './routes/userRouter.js';

// Initializing dotenv
config();

// Creating an express app
const app = express();

app.use(express.json()); // express middleware for parsing the incoming requests
app.use(morganConfig); // For server logs

// Setting the routes
app.use('/api', appRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening at PORT::${PORT}`);
});
