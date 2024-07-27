import express from 'express';
import { createUser, getUserById, getUsers } from '../controllers/userController';
const router = express.Router();

/* GET users listing. */
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);

export default router;
