import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { RegisterUseCase } from '../../../application/use-cases/auth/RegisterUseCase.js';
import { LoginUseCase } from '../../../application/use-cases/auth/LoginUseCase.js';
import { VerifyEmailUseCase } from '../../../application/use-cases/auth/VerifyEmailUseCase.js';
import { PrismaUserRepository } from '../../repositories/PrismaUserRepository.js';
import { BcryptPasswordService } from '../../services/BcryptPasswordService.js';
import { JwtTokenService } from '../../services/JwtTokenService.js';
import { EmailService } from '../../services/EmailService.js';
import { authenticate } from '../middlewares/auth.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { prisma } from '../../database/prisma.js';

const authRouter = Router();
const userRepository = new PrismaUserRepository(prisma);
const passwordService = new BcryptPasswordService();
const tokenService = new JwtTokenService();
const emailService = new EmailService();

const registerUseCase = new RegisterUseCase(
  userRepository,
  passwordService,
  tokenService,
  emailService,
);
const loginUseCase = new LoginUseCase(userRepository, passwordService, tokenService);
const verifyEmailUseCase = new VerifyEmailUseCase(userRepository, tokenService);

const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  verifyEmailUseCase,
  userRepository,
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Registration error
 *       409:
 *         description: User already exists
 */
authRouter.post(
  '/register',
  asyncHandler((req, res) => authController.register(req, res)),
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 */
authRouter.post(
  '/login',
  asyncHandler((req, res) => authController.login(req, res)),
);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid token
 */
authRouter.get(
  '/verify',
  asyncHandler((req, res) => authController.verifyEmail(req, res)),
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user data
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 emailVerified:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
authRouter.get(
  '/me',
  authenticate,
  asyncHandler((req, res) => authController.me(req, res)),
);

export { authRouter };
