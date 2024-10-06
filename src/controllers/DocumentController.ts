import { Request, Response } from 'express';
import * as documentService from '../services/DocumentService';

export const create = async (req: Request, res: Response) => {
    const { title, description, folderId } = req.body;
    const document = await documentService.createDocumentService(
        title,
        description,
        folderId
    );
    res.status(201).json(document);
};

export const getAll = async (req: Request, res: Response) => {
    const documents = await documentService.getAllDocumentsService();
    res.status(200).json(documents);
};

export const deleteDocument = async (req: Request, res: Response) => {
    const { id } = req.params;
    await documentService.deleteDocumentService(parseInt(id));
    res.status(204).send();
};
