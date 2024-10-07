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
};
