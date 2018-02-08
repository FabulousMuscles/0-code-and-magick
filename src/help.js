const commands = require(`./commands`);

module.exports = {
  name: `help`,
  execute() {
    console.log(commands);
  }
};
