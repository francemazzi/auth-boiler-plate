# Express Auth Boilerplate 🚀

<div align="center">

![Express Auth Banner](https://raw.githubusercontent.com/francemazzi/auth-boiler-plate/main/.github/assets/express.auth.jpg)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

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
# Create new project
npx create-express-auth my-app

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
# Start development server
npm run dev

# Run tests
npm test

# Database operations
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run seed              # Seed database
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

## 🔧 Environment Variables

```env
# Server
PORT=8080
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

## 🌐 Available Services

- **API**: [http://localhost:8080](http://localhost:8080)
- **API Docs**: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)
- **Email UI**: [http://localhost:8025](http://localhost:8025)
- **Database**: localhost:5432

## 📝 License

MIT © [Francesco Mazzi](LICENSE)

---

<div align="center">

Made with ❤️ by [Francesco Mazzi](https://github.com/francemazzi)

</div>
