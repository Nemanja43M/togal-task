import { DataSource } from 'typeorm';
import { Folder } from './entities/Folder';
import { Document } from './entities/Document';
import { FileVersion } from './entities/FileVersion';
import * as dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    // logging: true,
    entities: [Folder, Document, FileVersion],
});

export default AppDataSource;
