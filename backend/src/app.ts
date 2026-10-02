import cors from 'cors';
import express, { Application } from 'express';
import { Server as HttpServer } from 'http';
import { IRoute } from './interfaces/route.interface';
import { errorHandler } from './shared/middlewares/error.middleware';
import { AppConfig } from './config/app.config';

export class App {
    public readonly instance: Application = express();

    constructor(
        private readonly config: AppConfig,
        private readonly routes: IRoute[],
    ) {
        this.initMiddlewares();
        this.initHealthCheck();
        this.initRoutes();
        this.initErrorHandling();
    }

    private initMiddlewares(): void {
        this.instance.use(cors({ origin: this.config.corsOrigin }));
        this.instance.use(express.json());
    }

    private initHealthCheck(): void {
        this.instance.get('/', (_req, res) => {
            res.json({ message: 'API is running.' });
        });
    }

    private initRoutes(): void {
        this.routes.forEach((route) => {
            this.instance.use(route.path, route.router);
        });
    }

    private initErrorHandling(): void {
        this.instance.use(errorHandler);
    }

    listen(): HttpServer {
        return this.instance.listen(this.config.port, () => {
            console.log(`Server running on http://localhost:${this.config.port}`);
        });
    }
}