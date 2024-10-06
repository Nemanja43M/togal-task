import { Request, Response } from 'express';
import * as fileVersionService from '../services/ FileVersionService';

export const create = async (req: Request, res: Response) => {
    const { filePath, documentId } = req.body;
    const fileVersion = await fileVersionService.createFileVersionService(
        filePath,
        documentId
    );
    res.status(201).json(fileVersion);
};

export const getAll = async (req: Request, res: Response) => {
    const fileVersions = await fileVersionService.getAllFileVersionsService();
    res.status(200).json(fileVersions);
};

export const deleteFileVersion = async (req: Request, res: Response) => {
    const { id } = req.params;
    await fileVersionService.deleteFileVersionService(parseInt(id));
    res.status(204).send();
};
