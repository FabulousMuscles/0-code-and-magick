const packageInfo = require(`../../package.json`);

module.exports = {
  name: `author`,
  description: `Shows author name`,
  execute() {
    console.log(packageInfo.author);
  }
};
