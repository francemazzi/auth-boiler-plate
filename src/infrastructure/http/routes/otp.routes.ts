import { Router } from "express";
import { OTPController } from "../controllers/OTPController";
import { PrismaClient } from "@prisma/client";
import { OTPService } from "../../services/OTPService";
import { EnableOTPUseCase } from "../../../application/use-cases/otp/EnableOTPUseCase";
import { VerifyOTPUseCase } from "../../../application/use-cases/otp/VerifyOTPUseCase";
import { DisableOTPUseCase } from "../../../application/use-cases/otp/DisableOTPUseCase";
import { authenticateToken } from "../middlewares/auth";

export const otpRouter = Router();
const prisma = new PrismaClient();
const otpService = new OTPService(prisma);

const enableOTPUseCase = new EnableOTPUseCase(prisma, otpService);
const verifyOTPUseCase = new VerifyOTPUseCase(prisma, otpService);
const disableOTPUseCase = new DisableOTPUseCase(prisma, otpService);

const otpController = new OTPController(
  enableOTPUseCase,
  verifyOTPUseCase,
  disableOTPUseCase
);

otpRouter.use(authenticateToken);

/**
 * @swagger
 * /otp/enable:
 *   post:
 *     tags: [OTP]
 *     summary: Abilita l'autenticazione a due fattori per l'utente
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OTP abilitato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 secret:
 *                   type: string
 *                   description: Il codice segreto per configurare l'app authenticator
 *                 qrCode:
 *                   type: string
 *                   description: Il QR code da scansionare con l'app authenticator (base64)
 *       401:
 *         description: Non autorizzato
 *       400:
 *         description: Errore nella richiesta
 */
otpRouter.post("/enable", (req, res) => otpController.enable(req, res));

/**
 * @swagger
 * /otp/verify:
 *   post:
 *     tags: [OTP]
 *     summary: Verifica un token OTP
 *     security:
 *       - bearerAuth: []
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
 *                 description: Il token OTP da verificare
 *     responses:
 *       200:
 *         description: Token verificato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   description: Indica se il token è valido
 *       401:
 *         description: Non autorizzato
 *       400:
 *         description: Errore nella richiesta
 */
otpRouter.post("/verify", (req, res) => otpController.verify(req, res));

/**
 * @swagger
 * /otp/disable:
 *   post:
 *     tags: [OTP]
 *     summary: Disabilita l'autenticazione a due fattori per l'utente
 *     security:
 *       - bearerAuth: []
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
 *                 description: Il token OTP per confermare la disabilitazione
 *     responses:
 *       200:
 *         description: OTP disabilitato con successo
 *       401:
 *         description: Non autorizzato
 *       400:
 *         description: Errore nella richiesta
 */
otpRouter.post("/disable", (req, res) => otpController.disable(req, res));
