const authorCommand = require(`./author`);
const versionCommand = require(`./version`);
const packageInfo = require(`../package.json`);

const name2command = new Map();
name2command.set(authorCommand.name, authorCommand);
name2command.set(versionCommand.name, versionCommand);

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(packageInfo.description);
  process.exit(0);
}

const firstCommand = args[0];
if (!firstCommand.startsWith(`--`)) {
  console.error(`Unknown command: "${firstCommand}`);
  process.exit(1);
}

const commandName = firstCommand.substring(2);
if (commandName === `help`) {
  console.log(`Available commands: 
${[...name2command].map(([key, value]) => `--${key} — ${value.description}`).join(`\n`)}`);
  process.exit(0);
}

const command = name2command.get(commandName);

if (!command) {
  console.error(`Unknown command: "${firstCommand}`);
  process.exit(1);
}

command.execute();