export class AppConfig {
    private constructor(
        public readonly port: number,
        public readonly corsOrigin: string | undefined,
    ) { }

    static fromEnv(env: NodeJS.ProcessEnv = process.env): AppConfig {
        const port = Number(env.PORT);

        if (!Number.isInteger(port) || port <= 0) {
            throw new Error('Environment variable PORT is missing or invalid');
        }

        return new AppConfig(port, env.CORS_ORIGIN);
    }
}