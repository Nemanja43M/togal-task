import { Router } from 'express';
import { DocumentController } from '../controllers/DocumentController';

const router = Router();

router.post('/', DocumentController.create);
router.get('/', DocumentController.getAll);
router.post('/upload', DocumentController.uploadFile);
router.get('/:id', DocumentController.getById);
router.delete('/:id', DocumentController.delete);
router.get('/:id/file-versions', DocumentController.getFileVersions);
router.get('/download/:id', DocumentController.downloadFile);

export default router;
