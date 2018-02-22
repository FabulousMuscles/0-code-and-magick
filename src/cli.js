const authorCommand = require(`./cli/author`);
const versionCommand = require(`./cli/version`);
const generateCommand = require(`./cli/generate`);
const server = require(`./server/server`);

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
  server.run();
} else {
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

  const promise = command.execute();

  if (promise instanceof Promise) {
    promise.catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
  }
}
