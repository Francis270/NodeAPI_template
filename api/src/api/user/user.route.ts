import { Router } from 'express';

import { validateRequest } from '../../middlewares';
import * as UserHandlers from './user.handlers';
import { User } from './user.model';

const router = Router();

router.get('/', UserHandlers.defaultUser);

router.get('/:id', UserHandlers.findOne);

export default router;
