# Express Auth Boilerplate 🚀

A modern boilerplate to quickly create a Node.js server with Express, TypeScript, Prisma, and PostgreSQL, complete with authentication and API documentation.

## 📦 Quick Installation

```bash
npx create-express-auth my-app
cd my-app
npm run dev
```

## 🛠 Tech Stack

- **TypeScript** - Static typing for JavaScript
- **Express** - Fast, unopinionated web framework
- **Prisma** - Modern database ORM
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **Swagger** - API documentation
- **Winston** - Logging
- **Jest** - Testing

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

1. **Database Setup**

   ```bash
   # Create .env file from example
   cp .env.example .env

   # Configure your database in .env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

   # Run migrations
   npm run prisma:migrate
   ```

2. **Start the Server**

   ```bash
   # Development mode
   npm run dev

   # Production
   npm run build
   npm start
   ```

3. **Verify Installation**
   - Server: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs

## 📝 API Endpoints

### Auth

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get authenticated user profile

### Users

- `GET /api/users` - List users (admin)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🔒 Environment Variables

```env
PORT=3000
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

## 📚 Implemented Best Practices

- ✅ Clean Architecture
- ✅ Dependency Injection
- ✅ Centralized Error Handling
- ✅ Input validation with express-validator
- ✅ Structured Logging
- ✅ API Documentation with Swagger
- ✅ Security Best Practices
- ✅ Testing with Jest

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

MIT

---

Created with ❤️ to speed up the development of robust and secure APIs.
