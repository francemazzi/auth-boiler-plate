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

## ⚡️ One-Line Setup

```bash
npx create-express-auth my-app && cd my-app && docker-compose up -d
```

## ✨ Features

### 🔐 Enterprise Security

- **JWT Authentication** with refresh tokens and secure session management
- **Two-Factor Auth (2FA)** using TOTP with QR code support
- **Email Verification** with secure token-based flow
- **Rate Limiting** using LRU cache for DDoS protection
- **CORS Protection** with configurable origins
- **Password Hashing** with bcrypt and salt rounds
- **XSS Protection** with security headers
- **SQL Injection Prevention** with Prisma ORM

### 🏗 Clean Architecture

- **Domain-Driven Design** principles for scalable code organization
- **Use Case Pattern** for clear business logic separation
- **Repository Pattern** for database abstraction
- **Error Handling** with custom AppError class
- **Dependency Injection** for better testing and modularity
- **Service Layer** for external integrations

### 🧪 Testing & Quality

- **100% Type Coverage** with TypeScript
- **Integration Tests** with Jest and supertest
- **Unit Tests** with mocked repositories
- **E2E Tests** for critical flows
- **ESLint & Prettier** for code consistency
- **Git Hooks** with Husky for pre-commit checks
- **CI/CD Pipeline** with GitHub Actions

### 🐳 Docker & Infrastructure

- **Multi-stage builds** for optimal container size
- **PostgreSQL** with health checks and persistence
- **MailHog** for local email testing
- **Hot Reload** for rapid development
- **Environment Variables** management
- **Logging** with Winston
- **API Documentation** with Swagger UI

## 📚 Documentation

### Authentication Endpoints

#### 🔑 Register User

\`\`\`http
POST /api/auth/register
Content-Type: application/json

{
"email": "user@example.com",
"password": "securePassword123",
"name": "John Doe"
}
\`\`\`

#### 🔓 Login

\`\`\`http
POST /api/auth/login
Content-Type: application/json

{
"email": "user@example.com",
"password": "securePassword123"
}
\`\`\`

#### ✉️ Verify Email

\`\`\`http
GET /api/auth/verify?token=verification-token
\`\`\`

### Two-Factor Authentication

#### 🔒 Enable 2FA

\`\`\`http
POST /api/otp/enable
Authorization: Bearer <token>
\`\`\`

#### 🔍 Verify OTP

\`\`\`http
POST /api/otp/verify
Authorization: Bearer <token>

{
"token": "123456"
}
\`\`\`

### Response Examples

#### Success Response

\`\`\`json
{
"status": "success",
"data": {
"user": {
"id": "user-id",
"email": "user@example.com",
"name": "John Doe"
},
"token": "jwt-token"
}
}
\`\`\`

#### Error Response

\`\`\`json
{
"status": "error",
"message": "Invalid credentials",
"code": "INVALID_CREDENTIALS"
}
\`\`\`

## 🚀 Quick Start

1. **Create Project**
   \`\`\`bash
   npx create-express-auth my-app
   cd my-app
   \`\`\`

2. **Configure Environment**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. **Start Services**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

4. **Initialize Database**
   \`\`\`bash
   npm run prisma:generate
   npx prisma migrate dev
   \`\`\`

🎉 Your API is now running at http://localhost:8080!

## 🛠 Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Lint and format
npm run lint
npm run format

# Database operations
npm run prisma:generate  # Generate client
npm run prisma:migrate   # Run migrations
npm run seed            # Seed database
```

## 📦 Project Structure

\`\`\`
src/
├── application/ # Business Logic & Use Cases
│ └── use-cases/ # Auth and OTP implementations
│
├── domain/ # Core Business Rules
│ ├── entities/ # Business Objects
│ ├── repositories/ # Data Access Contracts
│ └── errors/ # Custom Error Handling
│
├── infrastructure/ # External Interfaces
│ ├── http/ # Express Configuration
│ │ ├── controllers/ # Request Handlers
│ │ ├── middlewares/ # Request Pipeline
│ │ └── routes/ # API Routes
│ └── services/ # External Services
│
└── test/ # Test Suites
\`\`\`

## 🤝 Contributing

Want to contribute? Check out our [Contributing Guide](CONTRIBUTING.md)!

## 📝 License

MIT © [Francesco Mazzi](LICENSE)

---

<div align="center">

Made with ❤️ by [Francesco Mazzi](https://github.com/francemazzi)

[![GitHub Stars](https://img.shields.io/github/stars/francemazzi/auth-boiler-plate?style=social)](https://github.com/francemazzi/auth-boiler-plate)

</div>
