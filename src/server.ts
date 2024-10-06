import express from 'express';
import AppDataSource from './data-source';

import * as dotenv from 'dotenv';

import folderRoutes from './routes/FolderRoutes';
import documentRoutes from './routes/DocumentRoutes';
import fileVersionRoutes from './routes/FileVersionRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', folderRoutes);
app.use('/api', documentRoutes);
app.use('/api', fileVersionRoutes);

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
