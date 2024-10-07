import { Request, Response } from 'express';
import { createNewFolder, removeFolder } from '../services/FolderService';
import { findAllFolders } from '../repositories/FolderRepository';

export const create = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    const folder = await createNewFolder(name);
    res.status(201).json(folder);
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const folders = await findAllFolders();
        res.status(200).json(folders);
    } catch (error) {
        console.error('Error fetching folders:', error);
        res.status(500).json({ message: 'Failed to fetch folders.' });
    }
};

export const deleteFolder = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    await removeFolder(Number(id));
    res.status(204).send();
};
