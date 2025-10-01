import { Router } from 'express';
import { authRouter } from './auth.routes';
import { otpRouter } from './otp.routes';
import { emailRouter } from './email.routes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/otp', otpRouter);
router.use('/email', emailRouter);
