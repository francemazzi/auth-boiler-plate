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
    `${colors.red}${colors.bright}Error: Missing project name${colors.reset}`
  );
  console.error(`\nCorrect usage:`);
  console.error(
    `${colors.cyan}npx create-express-auth${colors.reset} ${colors.yellow}<project-name>${colors.reset}\n`
  );
  console.error(`Example:`);
  console.error(
    `${colors.cyan}npx create-express-auth${colors.reset} ${colors.yellow}my-awesome-api${colors.reset}\n`
  );
  process.exit(1);
}

try {
  console.log(`\n${colors.bright}🚀 Initializing project...${colors.reset}\n`);

  fs.mkdirSync(projectName);
  console.log(
    `${colors.green}✓${colors.reset} Created directory: ${colors.cyan}${projectName}${colors.reset}`
  );

  console.log(`\n${colors.bright}📦 Cloning template...${colors.reset}`);
  execSync(
    `git clone --depth 1 https://github.com/francemazzi/auth-boiler-plate ${projectName}`
  );
  console.log(`${colors.green}✓${colors.reset} Template cloned successfully`);

  console.log(`\n${colors.bright}🧹 Cleaning repository...${colors.reset}`);
  fs.rmSync(path.join(process.cwd(), projectName, ".git"), {
    recursive: true,
    force: true,
  });
  console.log(`${colors.green}✓${colors.reset} Repository cleaned`);

  console.log(`\n${colors.bright}📥 Installing dependencies...${colors.reset}`);
  execSync(`cd ${projectName} && npm install`);
  console.log(`${colors.green}✓${colors.reset} Dependencies installed\n`);

  console.log(
    `${colors.bright}🎉 Project created successfully!${colors.reset}\n`
  );
  console.log(`${colors.bright}Next steps:${colors.reset}\n`);
  console.log(`1. ${colors.cyan}cd${colors.reset} ${projectName}`);
  console.log(
    `2. Copy ${colors.yellow}.env.example${colors.reset} to ${colors.yellow}.env${colors.reset} and configure variables`
  );
  console.log(
    `3. Start PostgreSQL with Docker:\n` +
      `   ${colors.cyan}docker-compose up -d${colors.reset}\n`
  );
  console.log(
    `4. Run ${colors.cyan}npm run prisma:generate${colors.reset} to generate Prisma client`
  );
  console.log(
    `5. Run ${colors.cyan}npm run prisma:migrate${colors.reset} to initialize the database`
  );
  console.log(
    `6. Start the server with ${colors.cyan}npm run dev${colors.reset}\n`
  );

  console.log(`${colors.bright}🐳 Docker Services:${colors.reset}`);
  console.log(`${colors.bright}📊 PostgreSQL:${colors.reset} localhost:5432`);
  console.log(
    `${colors.bright}📧 MailHog:${colors.reset} http://localhost:8025\n`
  );

  console.log(`${colors.bright}🔗 Application:${colors.reset}`);
  console.log(
    `${colors.bright}📚 API Documentation:${colors.reset} http://localhost:8080/api-docs`
  );
  console.log(
    `${colors.bright}🔧 Server:${colors.reset} http://localhost:8080\n`
  );
  console.log(`${colors.green}Happy coding! 💻${colors.reset}\n`);
} catch (error) {
  console.error(
    `\n${colors.red}${colors.bright}❌ Error creating project:${colors.reset}`
  );
  console.error(`${colors.red}${error.message}${colors.reset}\n`);
  process.exit(1);
}
