import { Router } from 'express';
import { OTPController } from '../controllers/OTPController.js';
import { OTPService } from '../../services/OTPService.js';
import { PrismaUserRepository } from '../../repositories/PrismaUserRepository.js';
import { EnableOTPUseCase } from '../../../application/use-cases/otp/EnableOTPUseCase.js';
import { VerifyOTPUseCase } from '../../../application/use-cases/otp/VerifyOTPUseCase.js';
import { DisableOTPUseCase } from '../../../application/use-cases/otp/DisableOTPUseCase.js';
import { authenticate } from '../middlewares/auth.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { prisma } from '../../database/prisma.js';

export const otpRouter = Router();
const userRepository = new PrismaUserRepository(prisma);
const otpService = new OTPService(prisma);

const enableOTPUseCase = new EnableOTPUseCase(userRepository, otpService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository, otpService);
const disableOTPUseCase = new DisableOTPUseCase(userRepository, otpService);

const otpController = new OTPController(enableOTPUseCase, verifyOTPUseCase, disableOTPUseCase);

otpRouter.use(authenticate);

/**
 * @swagger
 * /otp/enable:
 *   post:
 *     tags: [OTP]
 *     summary: Enable two-factor authentication for the user
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: OTP enabled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 secret:
 *                   type: string
 *                   description: The secret code to configure the authenticator app
 *                 qrCode:
 *                   type: string
 *                   description: The QR code to scan with the authenticator app (base64)
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Request error
 */
otpRouter.post(
  '/enable',
  asyncHandler((req, res) => otpController.enable(req, res)),
);

/**
 * @swagger
 * /otp/verify:
 *   post:
 *     tags: [OTP]
 *     summary: Verify an OTP token
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: The OTP token to verify
 *     responses:
 *       200:
 *         description: Token verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   description: Whether the token is valid
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Request error
 */
otpRouter.post(
  '/verify',
  asyncHandler((req, res) => otpController.verify(req, res)),
);

/**
 * @swagger
 * /otp/disable:
 *   post:
 *     tags: [OTP]
 *     summary: Disable two-factor authentication for the user
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: The OTP token to confirm disabling
 *     responses:
 *       200:
 *         description: OTP disabled successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Request error
 */
otpRouter.post(
  '/disable',
  asyncHandler((req, res) => otpController.disable(req, res)),
);
