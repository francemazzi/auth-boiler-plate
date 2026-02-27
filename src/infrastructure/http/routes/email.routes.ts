import { Router } from 'express';
import { EmailController } from '../controllers/EmailController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { EmailService } from '../../services/EmailService.js';

export const emailRouter = Router();
const emailService = new EmailService();
const emailController = new EmailController(emailService);

/**
 * @swagger
 * /email/test:
 *   post:
 *     summary: Send a test email (MailHog)
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Test email sent
 *       400:
 *         description: Missing or invalid email
 */
emailRouter.post(
  '/test',
  asyncHandler((req, res) => emailController.test(req, res)),
);
