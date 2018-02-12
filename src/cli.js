const authorCommand = require(`./author`);
const versionCommand = require(`./version`);
const generateCommand = require(`./generate`);
const packageInfo = require(`../package.json`);

require(`colors`);

const helpCommand = {
  name: `help`,
  description: `Prints this help`,
  execute() {
    console.log(`Available commands: 
${[...name2command].map(([key, value]) => `--${key.padEnd(10).italic.grey} — ${value.description.green}`).join(`\n`)}`);
  }
};

const name2command = new Map();
name2command.set(authorCommand.name, authorCommand);
name2command.set(versionCommand.name, versionCommand);
name2command.set(helpCommand.name, helpCommand);
name2command.set(generateCommand.name, generateCommand);

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
const command = name2command.get(commandName);

if (!command) {
  console.error(`Unknown command: "${firstCommand}`);
  process.exit(1);
}

command.execute((err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
});
