import express from 'express';
import { getUserById, getUsers } from '../controllers/userController';
const router = express.Router();

/* GET users listing. */
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;
