import { DocumentRepository } from '../repositories/DocumentRepository';
import { Document } from '../entities/Document';
import { FileVersion } from '../entities/FileVersion';
import { findOne } from '../repositories/FolderRepository';

export const DocumentService = {
    createDocument: async (
        title: string,
        description: string,
        folderId: number
    ): Promise<Document> => {
        const folder = await findOne(folderId);

        if (!folder) {
            throw new Error('Folder not found');
        }

        const document = new Document(title, description, folder);

        return await DocumentRepository.createDocument(
            title,
            description,
            folderId
        );
    },

    getAllDocuments: async (): Promise<Document[]> => {
        return await DocumentRepository.getAllDocuments();
    },

    uploadFileToDocument: async (
        documentId: number,
        filePath: string
    ): Promise<FileVersion> => {
        return await DocumentRepository.uploadFileToDocument(
            documentId,
            filePath
        );
    },

    deleteDocument: async (documentId: number): Promise<void> => {
        return await DocumentRepository.deleteDocument(documentId);
    },
};
