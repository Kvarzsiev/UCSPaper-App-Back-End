import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: Number(process.env.PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    synchronize: false,
    logging: false,
    entities: ['src/database/**/*.ts'],
    migrations: ['src/database/migrations/**/*.ts'],
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations'
    }
};

export = config;