#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

const projectName = process.argv[2];

if (!projectName) {
  console.error(
    `${colors.red}${colors.bright}Errore: Nome progetto mancante${colors.reset}`
  );
  console.error(`\nUtilizzo corretto:`);
  console.error(
    `${colors.cyan}npx create-express-auth${colors.reset} ${colors.yellow}<nome-progetto>${colors.reset}\n`
  );
  console.error(`Esempio:`);
  console.error(
    `${colors.cyan}npx create-express-auth${colors.reset} ${colors.yellow}my-awesome-api${colors.reset}\n`
  );
  process.exit(1);
}

try {
  console.log(
    `\n${colors.bright}🚀 Inizializzazione del progetto...${colors.reset}\n`
  );

  fs.mkdirSync(projectName);
  console.log(
    `${colors.green}✓${colors.reset} Directory creata: ${colors.cyan}${projectName}${colors.reset}`
  );

  console.log(`\n${colors.bright}📦 Clonazione del template...${colors.reset}`);
  execSync(
    `git clone --depth 1 https://github.com/francemazzi/auth-boiler-plate ${projectName}`
  );
  console.log(`${colors.green}✓${colors.reset} Template clonato con successo`);

  console.log(
    `\n${colors.bright}🧹 Pulizia della repository...${colors.reset}`
  );
  fs.rmSync(path.join(process.cwd(), projectName, ".git"), {
    recursive: true,
    force: true,
  });
  console.log(`${colors.green}✓${colors.reset} Repository pulita`);

  console.log(
    `\n${colors.bright}📥 Installazione dipendenze...${colors.reset}`
  );
  execSync(`cd ${projectName} && npm install`);
  console.log(`${colors.green}✓${colors.reset} Dipendenze installate\n`);

  console.log(
    `${colors.bright}🎉 Progetto creato con successo!${colors.reset}\n`
  );
  console.log(`${colors.bright}Prossimi passi:${colors.reset}\n`);
  console.log(`1. ${colors.cyan}cd${colors.reset} ${projectName}`);
  console.log(
    `2. Copia ${colors.yellow}.env.example${colors.reset} in ${colors.yellow}.env${colors.reset} e configura le variabili`
  );
  console.log(
    `3. Esegui ${colors.cyan}npm run prisma:migrate${colors.reset} per inizializzare il database`
  );
  console.log(
    `4. Avvia il server con ${colors.cyan}npm run dev${colors.reset}\n`
  );
  console.log(
    `${colors.bright}📚 Documentazione:${colors.reset} http://localhost:3000/api-docs`
  );
  console.log(
    `${colors.bright}🔧 Server:${colors.reset} http://localhost:3000\n`
  );
  console.log(`${colors.green}Buon coding! 💻${colors.reset}\n`);
} catch (error) {
  console.error(
    `\n${colors.red}${colors.bright}❌ Errore durante la creazione del progetto:${colors.reset}`
  );
  console.error(`${colors.red}${error.message}${colors.reset}\n`);
  process.exit(1);
}
