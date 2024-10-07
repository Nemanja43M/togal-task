import express from 'express';
import AppDataSource from './data-source';

import * as dotenv from 'dotenv';

import folderRoutes from './routes/FolderRoutes';
import documentRoutes from './routes/DocumentRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/folders', folderRoutes);
app.use('/api/documents', documentRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');

        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
