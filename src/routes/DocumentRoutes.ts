import { Router } from 'express';
import { DocumentController } from '../controllers/DocumentController';

const router = Router();

router.post('/', DocumentController.create);
router.get('/', DocumentController.getAll);
router.post('/upload', DocumentController.uploadFile);
router.delete('/:id', DocumentController.delete);

export default router;
