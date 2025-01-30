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

[Quick Start](#-quick-start) •
[Features](#-features) •
[Documentation](#-documentation)

</div>

## ✨ Features

- 🔐 **Authentication**: JWT, 2FA, Email Verification
- 🏗 **Clean Architecture**: DDD, Use Cases, Repository Pattern
- 🧪 **Testing**: Jest, Integration & Unit Tests
- 🐳 **Docker Ready**: PostgreSQL, MailHog, Hot Reload

## 🚀 Quick Start

```bash
# Create project
npx create-express-auth my-app

# Start services
cd my-app && docker-compose up -d
```

## 📚 Documentation

### Authentication Endpoints

\`\`\`http
POST /api/auth/register # Create account
POST /api/auth/login # Get JWT token
GET /api/auth/verify # Verify email
\`\`\`

### Two-Factor Authentication

\`\`\`http
POST /api/otp/enable # Setup 2FA
POST /api/otp/verify # Verify OTP
POST /api/otp/disable # Disable 2FA
\`\`\`

## 📦 Project Structure

```
src/
├── application/ # Business Logic
├── domain/ # Core Business Rules
├── infrastructure/ # External Interfaces
└── test/ # Test Suite
```

## 🛠 Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Database operations
npm run prisma:generate
npm run prisma:migrate
```

## 📝 License

MIT © [Francesco Mazzi](LICENSE)

---

<div align="center">

Made with ❤️ by [Francesco Mazzi](https://github.com/francemazzi)

</div>
