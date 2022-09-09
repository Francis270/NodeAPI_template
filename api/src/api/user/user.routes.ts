import { Router } from 'express';

import * as userController from './user.controller';
import { auth } from './../../utils/middlewares';

const router = Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

router.get('/:username', auth, userController.getUser);
router.delete('/:username', auth, userController.deleteUser);

router.post('/changeUsername', auth, userController.changeUsername);
router.post('/changePassword', auth, userController.changePassword);

export default router;
