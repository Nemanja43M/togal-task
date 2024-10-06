import { Folder } from '../entities/Folder';
import {
    createFolder,
    findAllFolders,
    deleteFolderById,
} from '../repositories/FolderRepository';

export const createNewFolder = async (name: string): Promise<Folder> => {
    return await createFolder(name);
};

export const getAllFolders = async (): Promise<Folder[]> => {
    return await findAllFolders();
};

export const removeFolder = async (id: number): Promise<void> => {
    await deleteFolderById(id);
};
