import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { otpRouter } from './otp.routes.js';
import { emailRouter } from './email.routes.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/otp', otpRouter);
router.use('/email', emailRouter);
