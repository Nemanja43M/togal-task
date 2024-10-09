import { Document } from '../entities/Document';
import AppDataSource from '../data-source';
import { FileVersion } from '../entities/FileVersion';

export const DocumentRepository = {
    repo: AppDataSource.getRepository(Document),

    async createDocument(
        title: string,
        description: string,
        folderId: number
    ): Promise<Document> {
        const document = this.repo.create({
            title,
            description,
            folder: { id: folderId },
        });
        return await this.repo.save(document);
    },

    getAllDocuments: async (): Promise<Document[]> => {
        const documentRepository = AppDataSource.getRepository(Document);

        const documents = await documentRepository.find({
            relations: ['fileVersions'],
        });

        return documents;
    },

    async getDocumentById(id: number): Promise<Document | null> {
        const document = await this.repo.findOne({
            where: { id },
            relations: ['fileVersions', 'folder'],
        });
        console.log(document);
        if (!document) {
            throw new Error(`Document with ID ${id} not found`);
        }

        return document;
    },

    async deleteDocument(id: number): Promise<void> {
        await this.repo.delete(id);
    },

    async uploadFileToDocument(
        documentId: number,
        filePath: string
    ): Promise<FileVersion> {
        const document = await this.repo.findOne({
            where: { id: documentId },
            relations: ['fileVersions'],
        });

        if (!document) {
            throw new Error('Document not found');
        }

        const fileVersion = new FileVersion(filePath, document);

        await AppDataSource.getRepository(FileVersion).save(fileVersion);

        document.fileVersions.push(fileVersion);

        await this.repo.save(document);

        return fileVersion;
    },
    async getFileVersionsForDocument(
        documentId: number
    ): Promise<FileVersion[]> {
        console.log(`Fetching file versions for document ID: ${documentId}`);

        try {
            const document = await this.repo.findOne({
                where: { id: documentId },
                relations: ['fileVersions'],
            });

            if (!document) {
                console.error(`Document with ID ${documentId} not found`);
                return [];
            }

            if (!document.fileVersions || document.fileVersions.length === 0) {
                console.log(
                    `No file versions found for document ID ${documentId}`
                );
                return [];
            }

            console.log(`File versions found:`, document.fileVersions);
            return document.fileVersions;
        } catch (error) {
            console.error('Error fetching file versions:', error);
            throw new Error('Could not fetch file versions');
        }
    },
};
