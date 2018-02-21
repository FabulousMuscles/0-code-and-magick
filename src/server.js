const express = require(`express`);
const {generate: generateWizards} = require(`./generator/wizards-generator`);

const app = express();
app.use(express.static(`static`));

const wizards = generateWizards();
app.get(`/api/wizards`, (req, res) => {
  res.send(wizards)
});

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;

const serverAddress = `http://${HOSTNAME}:${PORT}`;
module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  }
};
