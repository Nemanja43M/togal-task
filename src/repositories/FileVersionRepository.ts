import { Repository } from 'typeorm';
import { FileVersion } from '../entities/FileVersion';
import AppDataSource from '../data-source';

const fileVersionRepo: Repository<FileVersion> =
    AppDataSource.getRepository(FileVersion);

export const createFileVersion = async (
    filePath: string,
    documentId: number
): Promise<FileVersion> => {
    const fileVersion = fileVersionRepo.create({
        filePath,
        document: { id: documentId },
    });
    return await fileVersionRepo.save(fileVersion);
};

export const findAllFileVersions = async (): Promise<FileVersion[]> => {
    return await fileVersionRepo.find({ relations: ['document'] });
};

export const deleteFileVersionById = async (id: number): Promise<void> => {
    await fileVersionRepo.delete(id);
};
