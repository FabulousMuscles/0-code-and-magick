const {generate} = require(`./generator/wizards-generator`);
const fs = require(`fs`);

const filePath = `${process.cwd()}/wizards-data.json`;
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
const data = generate();

module.exports = {
  name: `generate`,
  description: `Generates data for project`,
  execute(cb) {
    fs.writeFile(filePath, JSON.stringify(data), fileWriteOptions, cb);
  }
};
