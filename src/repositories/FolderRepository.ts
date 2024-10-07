import { Repository } from 'typeorm';
import { Folder } from '../entities/Folder';
import AppDataSource from '../data-source';

const folderRepository: Repository<Folder> =
    AppDataSource.getRepository(Folder);

const repo: Repository<Folder> = AppDataSource.getRepository(Folder);

export const createFolder = async (name: string): Promise<Folder> => {
    const folder = folderRepository.create({ name });
    return await folderRepository.save(folder);
};

export const findAllFolders = async (): Promise<Folder[]> => {
    return await folderRepository.find({
        relations: ['documents', 'documents.fileVersions'],
    });
};
export const deleteFolderById = async (id: number): Promise<void> => {
    await folderRepository.delete(id);
};
export const findOne = async (folderId: number): Promise<Folder | null> => {
    try {
        const folder = await repo.findOne({
            where: { id: folderId },
            relations: ['documents'],
        });
        return folder;
    } catch (error) {
        console.error('Error finding folder:', error);
        throw new Error('Folder not found');
    }
};
