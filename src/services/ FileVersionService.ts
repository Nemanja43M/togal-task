import * as fileVersionRepo from '../repositories/FileVersionRepository';
import { FileVersion } from '../entities/FileVersion';

export const createFileVersionService = async (
    filePath: string,
    documentId: number
): Promise<FileVersion> => {
    return await fileVersionRepo.createFileVersion(filePath, documentId);
};

export const getAllFileVersionsService = async (): Promise<FileVersion[]> => {
    return await fileVersionRepo.findAllFileVersions();
};

export const deleteFileVersionService = async (id: number): Promise<void> => {
    await fileVersionRepo.deleteFileVersionById(id);
};
