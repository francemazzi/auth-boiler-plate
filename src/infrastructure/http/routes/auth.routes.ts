import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthController } from "../controllers/AuthController";
import { RegisterUseCase } from "../../../application/use-cases/auth/RegisterUseCase";
import { LoginUseCase } from "../../../application/use-cases/auth/LoginUseCase";
import { VerifyEmailUseCase } from "../../../application/use-cases/auth/VerifyEmailUseCase";
import { PrismaUserRepository } from "../../repositories/PrismaUserRepository";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const authRouter = Router();
const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);

const registerUseCase = new RegisterUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);
const verifyEmailUseCase = new VerifyEmailUseCase(userRepository);

const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  verifyEmailUseCase
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuovo utente
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
 *         description: Utente registrato con successo
 *       400:
 *         description: Errore nella registrazione
 */
authRouter.post("/register", (req, res) => authController.register(req, res));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Effettua il login
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
 *         description: Login effettuato con successo
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
 *         description: Credenziali non valide
 */
authRouter.post("/login", (req, res) => authController.login(req, res));

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verifica l'email dell'utente
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verificata con successo
 *       400:
 *         description: Token non valido
 */
authRouter.get("/verify", (req, res) => authController.verifyEmail(req, res));

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Ottiene i dati dell'utente corrente
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dati dell'utente
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
 *         description: Non autorizzato
 *       404:
 *         description: Utente non trovato
 */
authRouter.get(
  "/me",
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const user = await userRepository.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
);

export { authRouter };
