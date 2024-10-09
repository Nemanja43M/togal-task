import { Request, Response } from 'express';
import { DocumentService } from '../services/DocumentService';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'file_storage/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
interface FileVersion {
    id: number;
    filePath: string;
    createdAt: Date;
}

const upload = multer({ storage: storage });

export const DocumentController = {
    create: async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            const { title, description, folderId } = req.body;

            const document = await DocumentService.createDocument(
                title,
                description,
                folderId
            );
            res.status(201).json(document);
        } catch (error) {
            console.error('Error creating document:', error);
        }
    },

    getAll: async (req: Request, res: Response) => {
        try {
            const documents = await DocumentService.getAllDocuments();
            res.status(200).json(documents);
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const document = await DocumentService.getDocumentById(id);
            console.log('Fetched document:', document);
            if (!document) {
                res.status(404).json({ error: 'Document not found' });
                return;
            }

            res.status(200).json(document);
        } catch (error) {
            console.error('Error fetching document:', error);
            res.status(500).json({ error: 'Error fetching document' });
        }
    },

    uploadFile: async (req: Request, res: Response) => {
        console.log('HIT');
        upload.single('file')(req, res, async (err) => {
            console.log(req.file);
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            try {
                const documentId = parseInt(req.body.documentId);
                if (!req.file) {
                    return res.status(400).json({ error: 'No file uploaded.' });
                }
                const filePath = req.file.path;

                const newVersion = await DocumentService.uploadFileToDocument(
                    documentId,
                    filePath
                );

                const response = {
                    id: newVersion.id,
                    filePath: newVersion.filePath,
                    createdAt: newVersion.createdAt,
                };

                res.status(200).json(response);
            } catch (error) {
                res.status(500).json({ error: error });
            }
        });
    },

    delete: async (req: Request, res: Response) => {
        try {
            const documentId = parseInt(req.params.id);
            await DocumentService.deleteDocument(documentId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error });
        }
    },
    getFileVersions: async (req: Request, res: Response): Promise<void> => {
        try {
            const documentId = parseInt(req.params.id);
            console.log(documentId);
            const fileVersions =
                await DocumentService.getFileVersionsByDocumentId(documentId);

            if (!fileVersions || fileVersions.length === 0) {
                res.status(404).json({
                    error: 'No file versions found for this document',
                });
                return;
            }

            res.status(200).json(fileVersions);
        } catch (error) {
            console.error('Error fetching file versions:', error);
            res.status(500).json({ error: 'Error fetching file versions' });
        }
    },

    downloadFile: async (req: Request, res: Response): Promise<void> => {
        const fileVersionIdString = req.params.id;
        const fileVersionId = parseInt(fileVersionIdString);

        console.log(
            'Received fileVersionId:',
            req.params.id,
            'Parsed:',
            fileVersionId
        );
        if (isNaN(fileVersionId)) {
            res.status(400).json({ error: 'Invalid file version ID' });
        }

        try {
            const fileVersion = await DocumentService.getFileVersionById(
                fileVersionId
            );
            console.log(fileVersion);
            if (!fileVersion) {
                res.status(404).json({ error: 'File version not found' });
            }
            if (!fileVersion) {
                res.status(404).json({ error: 'File version not found' });
                return;
            }
            const filePath = fileVersion.filePath;
            const fileName = path.basename(filePath);

            if (!fs.existsSync(filePath)) {
                res.status(404).json({ error: 'File not found on server' });
            }

            res.download(filePath, fileName);
        } catch (error) {
            console.error('Error downloading file:', error);
            res.status(500).json({ error: 'Error downloading file' });
        }
    },
};
