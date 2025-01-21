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

[Documentazione](#-documentazione) •
[Quick Start](#-quick-start) •
[Caratteristiche](#-caratteristiche) •
[Architettura](#-architettura)

</div>

## 🚀 Quick Start

```bash
npx create-express-auth my-app
cd my-app
```

This will:

- Create a new directory with your project name
- Set up all the necessary files and dependencies
- Configure a basic authentication system
- Set up Docker containers for PostgreSQL and MailHog

## 🛠 Tech Stack

- **TypeScript** - Static typing for JavaScript
- **Express** - Fast, unopinionated web framework
- **Prisma** - Modern database ORM
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **Swagger** - API documentation
- **Winston** - Logging
- **Jest** - Testing
- **Docker** - Containerization for PostgreSQL and MailHog

## 🗂 Project Structure

```
src/
├── application/       # Business logic
├── domain/           # Entities and interfaces
├── infrastructure/   # Concrete implementations
│   ├── http/        # Express server and middleware
│   └── persistence/ # Repository and Prisma models
└── utils/           # Shared utilities
```

## 🚀 Getting Started

After running `npx create-express-auth my-app`, follow these steps:

1. **Configure Environment**

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
   npm run prisma:generate
   npx prisma migrate dev --name init
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🐳 Docker Services

- **PostgreSQL**: Running on `localhost:5432`
- **MailHog** (Email Testing): Available at `http://localhost:8025`

## 🔗 Application URLs

- **API Server**: http://localhost:8080
- **API Documentation**: http://localhost:8080/api-docs
- **Email Testing UI**: http://localhost:8025

## 📝 API Endpoints

### Auth

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get authenticated user profile

### Two-Factor Authentication (2FA)

- `POST /otp/enable` - Enable 2FA for the user
  - Returns a secret key and QR code for authenticator app setup
  - Requires JWT authentication
- `POST /otp/verify` - Verify an OTP token
  - Requires JWT authentication and OTP token in request body
- `POST /otp/disable` - Disable 2FA for the user
  - Requires JWT authentication and valid OTP token to confirm

#### Setting up 2FA

1. **Enable 2FA**:

   ```bash
   curl -X POST http://localhost:8080/otp/enable \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

   Response includes:

   - `secret`: Base32 secret key for manual setup
   - `qrCode`: QR code image (base64) for scanning with authenticator app

2. **Configure Authenticator App**:

   - Scan the QR code with Google Authenticator or similar app
   - Or manually enter the secret key

3. **Verify Setup**:
   ```bash
   curl -X POST http://localhost:8080/otp/verify \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"token": "123456"}'  # 6-digit code from authenticator app
   ```

### Users

- `GET /api/users` - List users (admin)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🔒 Environment Variables

```env
PORT=8080
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-super-secure-secret"
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Coverage
npm test -- --coverage
```

## 📈 Roadmap

- [ ] Testing with Supertest
- [ ] GraphQL Support
- [ ] Redis Caching
- [ ] OAuth Integration
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

[![Stargazers](https://img.shields.io/github/stars/yourusername/express-auth-boilerplate?style=social)](https://github.com/francemazzi/auth-boiler-plate)

</div>
