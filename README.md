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
[Documentation](#-api-documentation) •
[Docker](#-docker-setup)

</div>

## ⚡️ One-Line Setup

```bash
npx create-express-auth my-app && cd my-app && docker-compose up -d
```

## ✨ Key Features

### 🔐 Enterprise Security

- **JWT Authentication** with refresh tokens
- **Two-Factor Auth (2FA)** using TOTP
- **Email Verification** flow
- **Rate Limiting** with LRU Cache
- **CORS Protection** built-in

### 🏗 Clean Architecture

- **Domain-Driven Design** principles
- **Use Case Pattern** for business logic
- **Repository Pattern** for data access
- **Error Handling** centralized & typed

### 🧪 Testing & Quality

- **100% Type Coverage** with TypeScript
- **Jest Testing** setup with mocks
- **ESLint & Prettier** configured
- **Git Hooks** with Husky

### 🐳 Docker Ready

- **Multi-stage builds** optimized
- **PostgreSQL** with health checks
- **MailHog** for email testing
- **Hot Reload** in development

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

### 🔒 Two-Factor Auth

\`\`\`http
POST /api/otp/enable # Setup 2FA
POST /api/otp/verify # Verify OTP
POST /api/otp/disable # Disable 2FA
\`\`\`

## 🐳 Docker Setup

Services included:

- **API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/api-docs
- **PostgreSQL**: localhost:5432
- **MailHog UI**: http://localhost:8025

## 🧪 Development

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
├── domain/ # Entities & Interfaces
├── infrastructure/ # Framework & Drivers
│ ├── http/ # Express Setup
│ └── services/ # External Services
└── test/ # Test Suite
\`\`\`

## 🤝 Contributing

Contributions welcome! Check out our [Contributing Guide](CONTRIBUTING.md).

## 📝 License

MIT © [Francesco Mazzi](LICENSE)

---

<div align="center">

Made with ❤️ by [Francesco Mazzi](https://github.com/francemazzi)

[![GitHub Stars](https://img.shields.io/github/stars/francemazzi/auth-boiler-plate?style=social)](https://github.com/francemazzi/auth-boiler-plate)

</div>
