import { Router } from 'express';
import { EmailController } from '../controllers/EmailController';
import { asyncHandler } from '../middlewares/asyncHandler';
import { EmailService } from '../../services/EmailService';

export const emailRouter = Router();
const emailService = new EmailService();
const emailController = new EmailController(emailService);

/**
 * @swagger
 * /email/test:
 *   post:
 *     summary: Invia una email di test (MailHog)
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
 *         description: Email di test inviata
 *       400:
 *         description: Email mancante o invalida
 */
emailRouter.post(
  '/test',
  asyncHandler((req, res) => emailController.test(req, res)),
);
