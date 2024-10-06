import { Router } from 'express';
import * as documentController from '../controllers/DocumentController';

const router = Router();

router.post('/', documentController.create);
router.get('/', documentController.getAll);
router.delete('/:id', documentController.deleteDocument);

export default router;
