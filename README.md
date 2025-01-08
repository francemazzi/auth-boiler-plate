# Express Auth Boilerplate 🚀

Un boiler plate moderno per creare rapidamente un server Node.js con Express, TypeScript, Prisma e PostgreSQL, completo di autenticazione e documentazione API.

## 📦 Installazione Rapida

```bash
npx create-express-auth my-app
cd my-app
npm run dev
```

## 🛠 Stack Tecnologico

- **TypeScript** - Tipizzazione statica per JavaScript
- **Express** - Framework web veloce e minimale
- **Prisma** - ORM moderno per database
- **PostgreSQL** - Database relazionale
- **JWT** - Autenticazione basata su token
- **Swagger** - Documentazione API
- **Winston** - Logging
- **Jest** - Testing

## 🗂 Struttura del Progetto

```
src/
├── application/       # Logica di business
├── domain/           # Entità e interfacce
├── infrastructure/   # Implementazioni concrete
│   ├── http/        # Server Express e middleware
│   └── persistence/ # Repository e modelli Prisma
└── utils/           # Utility condivise
```

## 🚀 Come Iniziare

1. **Setup del Database**

   ```bash
   # Crea il file .env dalla copia di esempio
   cp .env.example .env

   # Configura il tuo database in .env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

   # Esegui le migrazioni
   npm run prisma:migrate
   ```

2. **Avvia il Server**

   ```bash
   # Modalità sviluppo
   npm run dev

   # Produzione
   npm run build
   npm start
   ```

3. **Verifica l'Installazione**
   - Server: http://localhost:3000
   - Documentazione API: http://localhost:3000/api-docs

## 📝 API Endpoints

### Auth

- `POST /api/auth/register` - Registrazione utente
- `POST /api/auth/login` - Login utente
- `GET /api/auth/me` - Profilo utente autenticato

### Users

- `GET /api/users` - Lista utenti (admin)
- `GET /api/users/:id` - Dettaglio utente
- `PUT /api/users/:id` - Aggiorna utente
- `DELETE /api/users/:id` - Elimina utente

## 🔒 Variabili d'Ambiente

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="il-tuo-secret-super-sicuro"
```

## 🧪 Testing

```bash
# Esegui tutti i test
npm test

# Coverage
npm test -- --coverage
```

## 📚 Best Practices Implementate

- ✅ Architettura pulita (Clean Architecture)
- ✅ Dependency Injection
- ✅ Error Handling centralizzato
- ✅ Validazione input con express-validator
- ✅ Logging strutturato
- ✅ Documentazione API con Swagger
- ✅ Security best practices
- ✅ Testing con Jest

## 🤝 Contributing

Le pull request sono benvenute! Per modifiche importanti, apri prima un issue per discutere cosa vorresti cambiare.

## 📄 Licenza

MIT

---

Creato con ❤️ per velocizzare lo sviluppo di API robuste e sicure.
