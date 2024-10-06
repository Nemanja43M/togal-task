import { Request, Response } from 'express';
import {
    createNewFolder,
    getAllFolders,
    removeFolder,
} from '../services/FolderService';

export const create = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    const folder = await createNewFolder(name);
    res.status(201).json(folder);
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
    const folders = await getAllFolders();
    res.status(200).json(folders);
};

export const deleteFolder = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    await removeFolder(Number(id));
    res.status(204).send();
};
