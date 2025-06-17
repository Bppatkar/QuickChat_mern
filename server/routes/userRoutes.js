import express from 'express';
import { login, signup } from '../controllers/userController.js';
import {
  checkAuth,
  protectRoutes,
  updateProfile,
} from '../middlewares/auth.js';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/update-profile').put(protectRoutes, updateProfile);
router.route('/check').get(protectRoutes, checkAuth);

export default router;
