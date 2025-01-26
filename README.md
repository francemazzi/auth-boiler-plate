# Express Auth Boilerplate 🚀

<div align="center">

![Express Auth Banner](https://raw.githubusercontent.com/francemazzi/auth-boiler-plate/main/.github/assets/express.auth.jpg)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A modern, production-ready authentication boilerplate built with TypeScript and Clean Architecture. Features comprehensive error handling, testing, and Docker support.

[Features](#-features) •
[Quick Start](#-quick-start) •
[Architecture](#-architecture) •
[Documentation](#-api-documentation)

</div>

## ✨ Features

- 🔐 **Enterprise-Grade Authentication**

  - JWT-based Authentication with refresh tokens
  - Two-Factor Authentication (TOTP)
  - Email Verification
  - Comprehensive Error Handling

- 🏗 **Clean Architecture**

  - Domain-Driven Design
  - Use Case Pattern
  - Repository Pattern
  - Centralized Error Management

- 🛡 **Security First**

  - Rate Limiting with LRU Cache
  - CORS Protection
  - JWT Token Management
  - Request Validation

- 🧪 **Testing & Quality**

  - Jest with TypeScript
  - Mocked Repositories
  - 100% Type Coverage
  - ESLint & Prettier

- 🐳 **Docker Ready**
  - Multi-stage builds
  - PostgreSQL with Health Checks
  - MailHog for Email Testing
  - Hot Reload in Development

## 🚀 Quick Start

```bash
# Create a new project
npx create-express-auth my-app

# Navigate to project
cd my-app

# Copy environment variables
cp .env.example .env

# Start services with Docker
docker-compose up -d

# Generate Prisma client and run migrations
npm run prisma:generate
npx prisma migrate dev
```

## 🏗 Project Structure

```
src/
├── application/          # Application business logic
│   └── use-cases/       # Use cases for auth and OTP
│
├── domain/              # Domain layer
│   ├── entities/        # Domain entities
│   ├── repositories/    # Repository interfaces
│   └── errors/         # Custom error handling
│
├── infrastructure/      # External interfaces
│   ├── http/           # Express configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── middlewares/ # Auth, errors, rate limiting
│   │   └── routes/      # API routes
│   └── services/       # External services
│
└── test/               # Test files and setup
```

## 🔧 Environment Variables

```env
# Server
PORT=8080
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auth-boiler-plate"

# JWT
JWT_SECRET="change-this-secret-in-production"
JWT_EXPIRES_IN="1d"

# Email
SMTP_HOST="mailhog"
SMTP_PORT=1025
```

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📚 API Documentation

### Authentication

```http
POST /api/auth/register   # Register new user
POST /api/auth/login      # Login user
GET  /api/auth/verify    # Verify email
```

### Two-Factor Authentication

```http
POST /api/otp/enable     # Enable 2FA
POST /api/otp/verify     # Verify OTP
POST /api/otp/disable    # Disable 2FA
```

## 🌐 Available Services

- **API**: http://localhost:8080
- **API Docs**: http://localhost:8080/api-docs
- **Email Testing**: http://localhost:8025
- **Database**: localhost:5432

## 🛠 Development Scripts

```bash
# Development
npm run dev         # Start with hot-reload
npm run lint       # Run ESLint
npm run format    # Run Prettier

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run seed            # Seed database

# Docker
npm run docker:up      # Start containers
npm run docker:down    # Stop containers
npm run docker:logs    # View logs
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ by Francesco Mazzi

[![GitHub Stars](https://img.shields.io/github/stars/francemazzi/auth-boiler-plate?style=social)](https://github.com/francemazzi/auth-boiler-plate)

</div>
