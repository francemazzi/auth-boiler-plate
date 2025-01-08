#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const projectName = process.argv[2];

if (!projectName) {
  console.error("Per favore specifica il nome del progetto:");
  console.error("npx create-express-auth my-app");
  process.exit(1);
}

try {
  fs.mkdirSync(projectName);

  execSync(
    `git clone --depth 1 https://github.com/francemazzi/auth-boiler-plate ${projectName}`
  );

  fs.rmSync(path.join(process.cwd(), projectName, ".git"), {
    recursive: true,
    force: true,
  });

  execSync(`cd ${projectName} && npm install`);

  console.log("🚀 Progetto creato con successo!");
  console.log(`
Per iniziare:

cd ${projectName}
npm run dev
  `);
} catch (error) {
  console.error("❌ Errore durante la creazione del progetto:", error);
  process.exit(1);
}
