#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function updateDependencies(packageJson) {
  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  for (const [key, value] of Object.entries(dependencies)) {
    dependencies[key] = value.replace(/[\^~]/, '');
  }
  for (const [key, value] of Object.entries(devDependencies)) {
    devDependencies[key] = value.replace(/[\^~]/, '');
  }

  return { ...packageJson, dependencies, devDependencies };
}

function validateProjectName(name) {
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    throw new Error('Project name can only contain letters, numbers, hyphens and underscores');
  }
  if (fs.existsSync(name)) {
    throw new Error(`Directory ${name} already exists`);
  }
}

const projectName = process.argv[2];

if (!projectName) {
  console.error(`${colors.red}${colors.bright}Error: Missing project name${colors.reset}`);
  console.error(`\nCorrect usage:`);
  console.error(
    `${colors.cyan}npx create-express-auth${colors.reset} ${colors.yellow}<project-name>${colors.reset}\n`,
  );
  console.error(`Example:`);
  console.error(
    `${colors.cyan}npx create-express-auth${colors.reset} ${colors.yellow}my-awesome-api${colors.reset}\n`,
  );
  process.exit(1);
}

try {
  validateProjectName(projectName);

  console.log(`\n${colors.bright}🚀 Initializing project...${colors.reset}\n`);

  fs.mkdirSync(projectName);
  console.log(
    `${colors.green}✓${colors.reset} Created directory: ${colors.cyan}${projectName}${colors.reset}`,
  );

  console.log(`\n${colors.bright}📦 Cloning template...${colors.reset}`);
  execSync(`git clone --depth 1 https://github.com/francemazzi/auth-boiler-plate ${projectName}`);
  console.log(`${colors.green}✓${colors.reset} Template cloned successfully`);

  console.log(`\n${colors.bright}🧹 Cleaning repository...${colors.reset}`);
  fs.rmSync(path.join(process.cwd(), projectName, '.git'), {
    recursive: true,
    force: true,
  });
  fs.rmSync(path.join(process.cwd(), projectName, 'bin', 'block-install.js'), {
    force: true,
  });

  const packageJsonPath = path.join(process.cwd(), projectName, 'package.json');
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  delete packageJson.scripts.preinstall;
  delete packageJson.scripts.install;
  delete packageJson.scripts.postinstall;

  packageJson.main = './src/infrastructure/http/server.ts';
  packageJson.name = projectName;
  packageJson.version = '1.0.0';

  packageJson = updateDependencies(packageJson);

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(`${colors.green}✓${colors.reset} Repository cleaned`);

  console.log(`\n${colors.bright}📥 Installing dependencies...${colors.reset}`);
  execSync(`cd ${projectName} && npm install`);
  console.log(`${colors.green}✓${colors.reset} Dependencies installed\n`);

  console.log(`${colors.bright}🎉 Project created successfully!${colors.reset}\n`);
  console.log(`${colors.bright}Next steps:${colors.reset}\n`);
  console.log(`1. ${colors.cyan}cd${colors.reset} ${projectName}`);
  console.log(
    `2. Copy ${colors.yellow}.env.example${colors.reset} to ${colors.yellow}.env${colors.reset} and configure variables`,
  );
  console.log(
    `3. Start PostgreSQL with Docker:\n` + `   ${colors.cyan}docker-compose up -d${colors.reset}\n`,
  );
  console.log(
    `4. Run ${colors.cyan}npm run prisma:generate${colors.reset} to generate Prisma client`,
  );
  console.log(
    `5. Create initial migration:\n` +
      `   ${colors.cyan}npx prisma migrate dev --name init${colors.reset}\n`,
  );
  console.log(`6. Start the server with ${colors.cyan}npm run dev${colors.reset}\n`);

  console.log(`${colors.bright}🐳 Docker Services:${colors.reset}`);
  console.log(`${colors.bright}📊 PostgreSQL:${colors.reset} localhost:5432`);
  console.log(`${colors.bright}📧 MailHog:${colors.reset} http://localhost:8025\n`);

  console.log(`${colors.bright}🔗 Application:${colors.reset}`);
  console.log(
    `${colors.bright}📚 API Documentation:${colors.reset} http://localhost:8080/api-docs`,
  );
  console.log(`${colors.bright}🔧 Server:${colors.reset} http://localhost:8080\n`);
  console.log(`${colors.green}Happy coding! 💻${colors.reset}\n`);
} catch (error) {
  console.error(`\n${colors.red}${colors.bright}❌ Error creating project:${colors.reset}`);
  console.error(`${colors.red}${error.message}${colors.reset}\n`);
  process.exit(1);
}
