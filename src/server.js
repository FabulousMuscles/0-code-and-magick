const express = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generate: generateWizards} = require(`./generator/wizards-generator`);

const app = express();
app.use(express.static(`static`));
app.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const wizards = generateWizards();

app.get(`/api/wizards`, (req, res) => res.send(wizards));

app.get(`/api/wizards/:name`, (req, res) => {
  const name = req.params[`name`].toLowerCase();
  const wizard = wizards.find((it) => it.name.toLowerCase() === name);
  if (!wizard) {
    res.status(404).end();
  } else {
    res.send(wizard);
  }
});

app.post(`/api/wizards`, upload.none(), (req, res) => {
  res.send(req.body);
});

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;

const serverAddress = `http://${HOSTNAME}:${PORT}`;
module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  },
  app
};
