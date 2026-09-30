import express from "express";

import dryDockRoutes from './routes/dry-dock.routes';

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API is running.",
  });
});

app.use('/api/dry-dock', dryDockRoutes);

export default app;