import express from 'express';
import { pageGetUsers, pageUpdateUser } from '../controllers/user.controller';
import { verifyJWT } from '../../api/controllers/auth.controller';

const router = express.Router();

router.get('/', verifyJWT, pageGetUsers);
router.get('/edit/:id', verifyJWT, pageUpdateUser);

export default router;