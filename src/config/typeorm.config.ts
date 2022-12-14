import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  // host: process.env.DB_HOST,
  // port: parseInt(process.env.DB_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
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

export = typeOrmConfig;
