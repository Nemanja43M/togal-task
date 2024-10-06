import * as documentRepo from '../repositories/DocumentRepository';
import { Document } from '../entities/Document';

export const createDocumentService = async (
    title: string,
    description: string,
    folderId: number
): Promise<Document> => {
    return await documentRepo.createDocument(title, description, folderId);
};

export const getAllDocumentsService = async (): Promise<Document[]> => {
    return await documentRepo.findAllDocuments();
};

export const deleteDocumentService = async (id: number): Promise<void> => {
    await documentRepo.deleteDocumentById(id);
};
