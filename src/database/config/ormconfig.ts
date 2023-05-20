const config = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.MYSQL_PORT || '3306'),
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || 'rootpass',
    database: process.env.MYSQL_DB || 'lattes_db',
    synchronize: true,
    logging: false,
    entities: ['src/entities/**/*.ts', 'dist/src/entities/**/*.js'],
    migrations: ['src/database/migrations/**/*.ts'],
};

export = config;