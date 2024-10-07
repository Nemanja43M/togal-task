import { Request, Response } from 'express';
import { DocumentService } from '../services/DocumentService';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'file_storage/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

export const DocumentController = {
    create: async (req: Request, res: Response) => {
        try {
            const { title, description, folderId } = req.body;
            const document = await DocumentService.createDocument(
                title,
                description,
                folderId
            );
            res.status(201).json(document);
        } catch (error) {
            res.status(500).json({ error });
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

    uploadFile: async (req: Request, res: Response) => {
        upload.single('file')(req, res, async (err) => {
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
};
