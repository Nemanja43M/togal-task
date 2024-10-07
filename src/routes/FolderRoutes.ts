import { Router } from 'express';
import { create, getAll, deleteFolder } from '../controllers/FolderController';

const router = Router();

router.post('/', create);
router.get('/', getAll);
router.delete('/:id', deleteFolder);

export default router;
