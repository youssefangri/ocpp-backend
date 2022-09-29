"use strict";
const typeOrmConfig = {
    type: 'mysql',
    host: 'localhost',
    port: parseInt('3306'),
    username: 'root',
    password: null,
    database: 'virtualstations',
    entities: [__dirname + './../**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: true,
    synchronize: true,
};
module.exports = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map