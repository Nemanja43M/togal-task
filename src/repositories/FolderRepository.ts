import { Repository } from 'typeorm';
import { Folder } from '../entities/Folder';
import AppDataSource from '../data-source';

const folderRepository: Repository<Folder> =
    AppDataSource.getRepository(Folder);

export const createFolder = async (name: string): Promise<Folder> => {
    const folder = folderRepository.create({ name });
    return await folderRepository.save(folder);
};

export const findAllFolders = async (): Promise<Folder[]> => {
    return await folderRepository.find();
};

export const deleteFolderById = async (id: number): Promise<void> => {
    await folderRepository.delete(id);
};
