#!/usr/bin/env node

// Verifica se il pacchetto viene installato direttamente
const isInstall = process.env.npm_config_argv
  ? JSON.parse(process.env.npm_config_argv).original[0] === "install"
  : process.env.npm_command === "install";

// Verifica se è un'installazione diretta e non una dipendenza di un altro pacchetto
const isDirectInstall = process.env.npm_config_argv
  ? JSON.parse(process.env.npm_config_argv).original.includes(
      "create-express-auth"
    )
  : process.env.npm_package_name === "create-express-auth";

if (isInstall && isDirectInstall) {
  console.error(`
\x1b[31m=====================================================\x1b[0m
\x1b[1m❌ ERRORE: Installazione diretta non supportata

Questo pacchetto è un generatore di progetti e non deve 
essere installato con npm install. Per favore usa:\x1b[0m

    \x1b[32mnpx create-express-auth my-app\x1b[0m

\x1b[1mQuesto comando creerà un nuovo progetto nella cartella
'my-app' con tutte le dipendenze necessarie.\x1b[0m

\x1b[34mPer maggiori informazioni visita:
https://github.com/francemazzi/auth-boiler-plate\x1b[0m
\x1b[31m=====================================================\x1b[0m
`);
  process.exit(1); // Blocca l'installazione
}
