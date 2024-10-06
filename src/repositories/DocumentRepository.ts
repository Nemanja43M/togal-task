import { Repository } from 'typeorm';
import { Document } from '../entities/Document';
import AppDataSource from '../data-source';

const documentRepo: Repository<Document> =
    AppDataSource.getRepository(Document);

export const createDocument = async (
    title: string,
    description: string,
    folderId: number
): Promise<Document> => {
    const document = documentRepo.create({
        title,
        description,
        folder: { id: folderId },
    });
    return await documentRepo.save(document);
};

export const findAllDocuments = async (): Promise<Document[]> => {
    return await documentRepo.find({ relations: ['folder', 'fileVersions'] });
};

export const deleteDocumentById = async (id: number): Promise<void> => {
    await documentRepo.delete(id);
};
