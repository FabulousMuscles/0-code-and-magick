const express = require(`express`);
const wizardsRouter = require(`./wizards/route`);

const app = express();
app.use(express.static(`static`));

app.use(`/api/wizards`, wizardsRouter);

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
