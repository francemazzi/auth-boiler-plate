import { Router } from 'express';
import { authRouter } from './auth.routes';
import { otpRouter } from './otp.routes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/otp', otpRouter);
