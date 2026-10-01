import express from "express";

import dryDockRoutes from './routes/dry-dock.routes';
import checklistkRoutes from './routes/checklist.routes';
import cors from 'cors';
import { errorHandler } from "./shared/middlewares/error.middleware";
import dotenv from 'dotenv'

const app = express();

dotenv.config()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
)

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API is running.",
  });
});

app.use('/api/dry-dock', dryDockRoutes);
app.use('/api/checklist', checklistkRoutes);

app.use(errorHandler);

export default app;