import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
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