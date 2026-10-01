import express from "express";

import dryDockRoutes from './routes/dry-dock.routes';
import checklistRoutes from './routes/checklist.routes';
import checklistItemRoutes from './routes/checklist-item.routes';
import specificationGroupRoutes from './routes/specification-group.routes';
import workOrderMasterRoutes from './routes/work-order-master.routes';
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
app.use('/api/checklist', checklistRoutes);
app.use('/api/checklist-item', checklistItemRoutes);
app.use('/api/specification-group', specificationGroupRoutes);
app.use('/api/work-order-master', workOrderMasterRoutes);

app.use(errorHandler);

export default app;