import { DocumentRepository } from '../repositories/DocumentRepository';
import { Document } from '../entities/Document';
import { FileVersion } from '../entities/FileVersion';
import { findOne } from '../repositories/FolderRepository';
import AppDataSource from '../data-source';

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

    getDocumentById: async (id: any): Promise<Document | null> => {
        try {
            const documentRepository = AppDataSource.getRepository(Document);
            const document = await documentRepository.findOne({
                where: { id },
            });

            if (!document) {
                return null;
            }
            return document;
        } catch (error) {
            console.error('Error fetching document: Service', error);
            throw new Error('Error fetching document');
        }
    },
    async getFileVersionsByDocumentId(
        documentId: number
    ): Promise<FileVersion[]> {
        return await DocumentRepository.getFileVersionsForDocument(documentId);
    },
    async getFileVersionById(id: number): Promise<FileVersion | null> {
        const fileVersionRepository = AppDataSource.getRepository(FileVersion);
        const fileVersion = await fileVersionRepository.findOne({
            where: { id },
        });

        return fileVersion || null;
    },
};
