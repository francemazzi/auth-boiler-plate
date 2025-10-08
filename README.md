# Express Auth Boilerplate 🚀

<div align="center">

![Express Auth Banner](https://raw.githubusercontent.com/francemazzi/auth-boiler-plate/main/.github/assets/express.auth.jpg)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Contributors](https://img.shields.io/github/contributors/francemazzi/auth-boiler-plate?style=for-the-badge)](https://github.com/francemazzi/auth-boiler-plate/graphs/contributors)

Production-ready authentication boilerplate built with TypeScript and Clean Architecture.
Get your secure API up and running in minutes! 🔥

[Quick Start](#-quick-start) •
[Features](#-features) •
[Documentation](#-documentation) •
[Development](#-development)

</div>

## ✨ Features

### 🔐 Security

- **JWT Authentication** with refresh tokens
- **Two-Factor Auth (2FA)** with QR code support
- **Email Verification** with secure tokens
- **Rate Limiting** against DDoS attacks
- **CORS Protection** with configurable origins
- **Password Hashing** with bcrypt
- **XSS Protection** with security headers

### 🏗 Architecture

- **Clean Architecture** principles
- **Domain-Driven Design** patterns
- **Repository Pattern** for data access
- **Error Handling** with custom AppError
- **Dependency Injection** ready

### 🧪 Quality Assurance

- **100% TypeScript** coverage
- **Jest Testing** with mocks
- **ESLint & Prettier** configured
- **Git Hooks** with Husky
- **CI/CD** ready

### 🐳 Infrastructure

- **Docker Compose** setup
- **PostgreSQL** database
- **MailHog** for email testing
- **Hot Reload** development
- **Swagger UI** documentation

## 🚀 Quick Start

```bash
# Create new project (npm)
npx create-express-auth my-app

# Or with Bun
bunx create-express-auth my-app

# Navigate and start services
cd my-app && docker-compose up -d
```

## 📚 Documentation

### Authentication API

```http
POST /api/auth/register     # Create new account
POST /api/auth/login        # Get JWT token
GET  /api/auth/verify      # Verify email
```

### Two-Factor Auth API

```http
POST /api/otp/enable       # Enable 2FA
POST /api/otp/verify       # Verify OTP code
POST /api/otp/disable      # Disable 2FA
```

## 🛠 Development

```bash
# Using npm
npm run dev
npm test
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run seed               # Seed database

# Using Bun
bun run dev
bun run test
bun run prisma:generate    # Generate Prisma client
bun run prisma:migrate     # Run migrations
bun run seed               # Seed database
```

## 📦 Project Structure

```
src/
├── application/          # Business Logic Layer
│   └── use-cases/       # Application Use Cases
│
├── domain/              # Domain Layer
│   ├── entities/        # Business Objects
│   ├── repositories/    # Data Contracts
│   └── errors/          # Error Handling
│
├── infrastructure/      # Infrastructure Layer
│   ├── http/           # Express Setup
│   │   ├── controllers/  # Request Handlers
│   │   ├── middlewares/ # HTTP Pipeline
│   │   └── routes/      # API Routes
│   └── services/       # External Services
│
└── test/               # Test Suites
```

## 🧱 Hexagonal Architecture (Ports & Adapters)

This project follows Hexagonal Architecture (a.k.a. Ports & Adapters) to keep the core business independent from frameworks, databases and I/O details.

- **Domain (Core)**: business rules expressed via `entities`, `errors`, and domain `types`.
- **Application**: orchestration of use-cases (application services) that coordinate domain logic and ports.
- **Infrastructure**: adapters for the outside world (HTTP controllers, repositories implementation, email/otp services, DB, etc.).

### Principles

- **Dependency Rule**: inner layers don’t depend on outer layers. `domain` knows nothing about HTTP/DB; `application` depends on `domain`, never the opposite.
- **Ports**: interfaces in `domain/repositories` (and service contracts) define what the core needs from the outside.
- **Adapters**: concrete implementations in `infrastructure` satisfy those ports (e.g., `PrismaUserRepository` implements `IUserRepository`).
- **Thin Controllers**: controllers should not contain business logic; they validate/parse input and delegate to use-cases or repositories based on complexity.

### Use-Cases: When to Use Them

Use-cases are application services meant for flows that are more than a trivial CRUD operation.

Create a use-case when you have one or more of the following:

- **Business Orchestration**: multiple steps, transactions, or calls across repositories/services.
- **Domain Invariants**: validations and rules that must be enforced consistently.
- **Side Effects**: sending emails, publishing events, generating tokens, etc.
- **Cross-Cutting Concerns**: idempotency, auditing, retries, compensations.

Avoid creating a use-case for very simple CRUD where the controller can safely call a repository method directly with minimal validation.

### Examples

#### 1) Simple CRUD (No Use-Case)

A very simple update that doesn’t require orchestration can call the repository directly from the controller.

```ts
// src/infrastructure/http/controllers/UserController.ts
import { Request, Response } from 'express';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';

export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

  // Example: update display name is a trivial CRUD with minimal rules
  updateProfile = async (req: Request, res: Response) => {
    const { displayName } = req.body;
    // Minimal validation; no complex rules
    const user = await this.userRepository.updateDisplayName(req.user!.id, displayName);
    res.json({ id: user.id, displayName: user.displayName });
  };
}
```

When the logic is only “validate input → persist → return”, a dedicated use-case often adds unnecessary indirection.

#### 2) Complex Flow (Use-Case)

Changing a password (as example) touches security rules, hashing, and validations. This is a good candidate for a use-case.

```ts
// src/application/use-cases/auth/ChangePasswordUseCase.ts
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { AppError } from '../../../domain/errors/AppError';

export interface PasswordHasher {
  hash(plain: string): Promise<string>;
  verify(plain: string, hashed: string): Promise<boolean>;
}

export class ChangePasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(input: {
    userId: string;
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    const user = await this.userRepository.findById(input.userId);
    if (!user) throw new AppError('User not found', 404);

    const isValid = await this.hasher.verify(input.currentPassword, user.password);
    if (!isValid) throw new AppError('Invalid credentials', 401);

    const newHashed = await this.hasher.hash(input.newPassword);
    await this.userRepository.updatePassword(user.id, newHashed);
  }
}
```

Controller delegates to the use-case, keeping HTTP concerns separate from business orchestration:

```ts
// src/infrastructure/http/controllers/AuthController.ts
import { Request, Response } from 'express';
import { ChangePasswordUseCase } from '../../../application/use-cases/auth/ChangePasswordUseCase';

export class AuthController {
  constructor(private readonly changePassword: ChangePasswordUseCase) {}

  changePasswordHandler = async (req: Request, res: Response) => {
    await this.changePassword.execute({
      userId: req.user!.id,
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    });
    res.status(204).send();
  };
}
```

This mirrors existing use-cases like `RegisterUseCase`, `LoginUseCase`, `VerifyEmailUseCase`, and OTP flows, which coordinate repositories and external services (email, OTP) while enforcing domain rules.

## 🔧 Environment Variables

```env
# Server
PORT=8081
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auth-boiler-plate

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

# Email
SMTP_HOST=mailhog
SMTP_PORT=1025
```

## 🧪 Integration Tests

This project includes integration tests that run against a real Postgres (e.g., via docker-compose) and exercise the API routes using Supertest. Remember that database server should run.

```bash
# Start services (Postgres, MailHog)
npm run docker:up

# Run integration suite
npm run test:integration
```

Integration tests live in `test-integration/`. They reuse the actual Express app via `src/infrastructure/http/appFactory.ts` without starting an HTTP listener, and clean the DB between tests.

## 🌐 Available Services

- **API**: [http://localhost:8081](http://localhost:8081)
- **API Docs**: [http://localhost:8081/api-docs](http://localhost:8081/api-docs)
- **Email UI**: [http://localhost:8025](http://localhost:8025)
- **Database**: localhost:5432

## 📝 License

MIT © [Francesco Mazzi](LICENSE)

---

<div align="center">

</div>

## 👥 Contributors

Thanks to all contributors!

<a href="https://github.com/francemazzi/auth-boiler-plate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=francemazzi/auth-boiler-plate" />
  <!-- Dynamic contributors image generated by contrib.rocks -->
  <!-- If it fails to load, visit the link above to see the list -->
  
</a>
