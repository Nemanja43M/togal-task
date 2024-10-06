import { Router } from 'express';
import { create, getAll, deleteFolder } from '../controllers/FolderController';

const router = Router();

router.post('/folders', create);
router.get('/folders', getAll);
router.delete('/folders/:id', deleteFolder);

export default router;
