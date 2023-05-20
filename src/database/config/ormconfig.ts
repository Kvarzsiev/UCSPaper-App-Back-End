const config = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    synchronize: true,
    logging: false,
    entities: ['src/entities/**/*.ts', 'dist/src/entities/**/*.js'],
    migrations: ['src/database/migrations/**/*.ts'],
};

export = config;