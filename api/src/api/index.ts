import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import user from './user/user.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  	res.json({
	    message: 'welcome to api/v1 home',
  	});
});

router.use('/user', user);

export default router;
