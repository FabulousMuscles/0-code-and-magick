const express = require(`express`);
const wizardStore = require(`./wizards/store`);
const imageStore = require(`./images/store`);
const wizardsRouter = require(`./wizards/route`)(wizardStore, imageStore);
const logger = require(`../logger`);

const app = express();
app.use(express.static(`static`));

app.use(`/api/wizards`, wizardsRouter);

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

const serverAddress = `http://${HOSTNAME}:${PORT}`;
module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      logger.info(`Server running at ${serverAddress}/`);
    });
  },
  app
};
