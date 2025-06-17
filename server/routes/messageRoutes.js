import express from 'express';

import { protectRoutes } from '../middlewares/auth.js';
import {
  getMessage,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from '../controllers/MessageController.js';

const router = express.Router();

router.route('/users').get(protectRoutes, getUsersForSidebar);
router.route('/:id').get(protectRoutes, getMessage);
router.route('/mark/:id').put(protectRoutes, markMessageAsSeen);
router.route('/send/:id').post(protectRoutes, sendMessage);

export default router;
