import { Router } from 'express';
import * as fileVersionController from '../controllers/FileVersionController';

const router = Router();

router.post('/', fileVersionController.create);
router.get('/', fileVersionController.getAll);
router.delete('/:id', fileVersionController.deleteFileVersion);

export default router;
