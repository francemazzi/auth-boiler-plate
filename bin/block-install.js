#!/usr/bin/env node

const path = require("path");

const isInPackageRoot = process.cwd().endsWith("auth-boiler-plate");

const isInstall = process.env.npm_config_argv
  ? JSON.parse(process.env.npm_config_argv).original[0] === "install"
  : process.env.npm_command === "install";

const isDirectInstall = process.env.npm_config_argv
  ? JSON.parse(process.env.npm_config_argv).original.includes(
      "create-express-auth"
    )
  : process.env.npm_package_name === "create-express-auth";

if (isInstall && isDirectInstall && isInPackageRoot) {
  console.error(`
\x1b[31m=====================================================\x1b[0m
\x1b[1m❌ ERROR: Direct installation not supported

This package is a project generator and should not be
installed with npm install. Please use:\x1b[0m

    \x1b[32mnpx create-express-auth my-app\x1b[0m

\x1b[1mThis command will create a new project in the 'my-app'
folder with all necessary dependencies.\x1b[0m

\x1b[34mFor more information visit:
https://github.com/francemazzi/auth-boiler-plate\x1b[0m
\x1b[31m=====================================================\x1b[0m
`);
  process.exit(1);
}
