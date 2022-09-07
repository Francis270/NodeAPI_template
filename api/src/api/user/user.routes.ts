import { Router } from 'express';

import * as UserController from './user.controller';

const router = Router();

router.get('/', UserController.defaultUser);
router.get('/:id', UserController.findOne);

export default router;
