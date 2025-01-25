# Express Auth Boilerplate 🚀

<div align="center">

![Express Auth Banner](https://raw.githubusercontent.com/francemazzi/auth-boiler-plate/main/.github/assets/express.auth.jpg)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A modern, production-ready authentication boilerplate built with TypeScript, Express, and Prisma. Features clean architecture, comprehensive testing, and Docker support out of the box.

[Features](#-features) •
[Quick Start](#-quick-start) •
[Architecture](#-architecture) •
[Documentation](#-documentation)

</div>

## ✨ Features

- 🔐 **Enterprise-Grade Authentication**

  - JWT-based Authentication
  - Two-Factor Authentication (TOTP)
  - Email Verification
  - Rate Limiting

- 🏗 **Clean Architecture**

  - Domain-Driven Design
  - SOLID Principles
  - Repository Pattern
  - Use Case Pattern

- 🛡 **Security First**

  - Request Rate Limiting
  - CORS Protection
  - Password Hashing
  - JWT Token Management

- 🧪 **Testing & Quality**

  - Jest Unit Tests
  - Error Handling
  - Code Coverage
  - ESLint & Prettier

- 🐳 **Docker Ready**

  - Multi-container setup
  - PostgreSQL
  - MailHog for email testing
  - Production-ready configuration

- 📚 **API Documentation**
  - OpenAPI/Swagger
  - Detailed error codes
  - Comprehensive examples

## 🚀 Quick Start

```bash
# Create a new project
npx create-express-auth my-app

# Navigate to project
cd my-app

# Start services with Docker
docker-compose up -d

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## 🏗 Project Structure

```
src/
├── application/          # Application business logic
│   └── use-cases/       # Use cases implementation
│
├── domain/              # Domain layer
│   ├── entities/        # Domain entities
│   ├── repositories/    # Repository interfaces
│   └── errors/         # Custom error classes
│
├── infrastructure/      # External interfaces
│   ├── http/           # Express configuration
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── routes/
│   └── services/       # External services
│
└── test/               # Test files
```

## 🔧 Environment Setup

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd <project-name>
   npm install
   ```

2. **Environment Variables**

   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Database Setup**

   ```bash
   # Start PostgreSQL
   docker-compose up -d postgres

   # Generate Prisma Client
   npm run prisma:generate

   # Run migrations
   npx prisma migrate dev
   ```

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🔒 API Endpoints

### Authentication

```http
POST /api/auth/register   # Create new account
POST /api/auth/login      # Login
GET  /api/auth/verify    # Verify email
```

### Two-Factor Authentication

```http
POST /api/otp/enable    # Enable 2FA
POST /api/otp/verify    # Verify OTP
POST /api/otp/disable   # Disable 2FA
```

## 🌐 Service URLs

- **API**: http://localhost:8080
- **Swagger Docs**: http://localhost:8080/api-docs
- **Email Testing**: http://localhost:8025

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ by Francesco Mazzi

[![GitHub Stars](https://img.shields.io/github/stars/francemazzi/auth-boiler-plate?style=social)](https://github.com/francemazzi/auth-boiler-plate)

</div>
