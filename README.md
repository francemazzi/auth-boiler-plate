# Express Auth Boilerplate

<div align="center">

![Express Auth Banner](https://raw.githubusercontent.com/francemazzi/auth-boiler-plate/main/.github/assets/express.auth.jpg)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A modern boilerplate to quickly create a Node.js server with Express, TypeScript, Prisma, and PostgreSQL, complete with authentication and API documentation.

[Documentation](#-documentation) •
[Quick Start](#-quick-start) •
[Features](#-features) •
[Architecture](#-architecture)

</div>

## ✨ Features

- 🔐 **Complete Authentication**

  - JWT Authentication
  - Two-Factor Authentication (2FA/TOTP)
  - Email Verification

- 🏗 **Robust Architecture**

  - Clean Architecture
  - Repository Pattern
  - SOLID Principles

- 🛡 **Security**

  - Rate Limiting
  - CORS Configuration
  - Password Hashing

- 📊 **Database & ORM**

  - PostgreSQL
  - Prisma ORM

- 🧪 **Testing & Quality**

  - Coverage Reports
  - ESLint & Prettier
  - Husky Hooks

- 📚 **Documentation**
  - Swagger/OpenAPI
  - JSDoc Comments

## 🚀 Quick Start

```bash
npx create-express-auth my-app
cd my-app
```

## 🏗 Architecture

```
src/
├── application/          # Business Logic
│   ├── use-cases/       # Application Use Cases
│   └── interfaces/      # Repository Interfaces
│
├── domain/              # Domain Logic
│   ├── entities/        # Domain Models
│   └── value-objects/   # Value Objects
│
├── infrastructure/      # Concrete Implementations
│   ├── http/           # Express Server & Middleware
│   ├── persistence/    # Repository & Prisma Models
│   └── services/       # External Services (email, cache, etc.)
│
└── utils/              # Shared Utilities
```

## 🚀 Setup & Configuration

1. **Environment Setup**

   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

2. **Start Services**

   ```bash
   docker-compose up -d
   ```

3. **Database Setup**

   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Run migrations
   npx prisma migrate dev

   # Seed the database with initial data
   npm run seed
   ```

   Default seeded accounts:

   - Admin: admin@example.com / admin123
   - Users: user1@example.com through user5@example.com / user123

4. **Start Server**
   ```bash
   npm run dev
   ```

## 🔗 Service URLs

- **API Server**: http://localhost:8080
- **API Documentation**: http://localhost:8080/api-docs
- **Email Testing UI**: http://localhost:8025

## 📝 API Documentation

### Authentication

```http
POST /auth/register     # User registration
POST /auth/login       # User login
GET  /auth/me          # Get authenticated user profile
POST /auth/refresh     # Refresh token
POST /auth/logout      # User logout
```

### User Management

```http
GET    /api/users      # List users (admin)
GET    /api/users/:id  # Get user details
PUT    /api/users/:id  # Update user
DELETE /api/users/:id  # Delete user
```

### Two-Factor Authentication (2FA)

```http
POST /otp/enable       # Enable 2FA
POST /otp/verify       # Verify OTP token
POST /otp/disable      # Disable 2FA
```

## 🔧 Environment Variables

```env
# Server
PORT=8080
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Authentication
JWT_SECRET="your-super-secure-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_EXPIRES_IN="1h"

# Email
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-email@example.com"
SMTP_PASS="your-smtp-password"
```

## 🧪 Testing

```bash
# Unit Tests
npm run test

# E2E Tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📈 Roadmap

- [ ] Password Reset
- [ ] Jest & Supertest testing
- [ ] Redis Caching
- [ ] WebSocket Support
- [ ] Microservices Architecture
- [ ] Kubernetes Configuration

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT License • Copyright (c) 2024 Francesco

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for full details.

---

<div align="center">
Made with ❤️ to speed up the development of robust and secure APIs.

[![Stargazers](https://img.shields.io/github/stars/francemazzi/auth-boiler-plate?style=social)](https://github.com/francemazzi/auth-boiler-plate)

</div>
