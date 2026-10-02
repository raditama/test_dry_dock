import 'dotenv/config';
import { App } from './app.js';
import { AppConfig } from './config/app.config.js';
import { routes } from './container.js';

const config = AppConfig.fromEnv();

const app = new App(config, routes);

app.listen();