const {Router} = require(`express`);
const {validateSchema} = require(`../util/validator`);
const codeAndMagicSchema = require(`./validation`);
const dataRenderer = require(`../util/data-renderer`);
const ValidationError = require(`../error/validation-error`);
const NotFoundError = require(`../error/not-found-error`);
const async = require(`../util/async`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);
const logger = require(`../../logger`);

const wizardsRouter = new Router();

wizardsRouter.use(bodyParser.json());

wizardsRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const upload = multer({storage: multer.memoryStorage()});

const toPage = async (cursor, skip = 0, limit = 20) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await cursor.count()
  };
};

wizardsRouter.get(``, async(async (req, res) => res.send(await toPage(await wizardsRouter.wizardsStore.getAllWizards()))));

wizardsRouter.post(``, upload.single(`avatar`), async(async (req, res) => {
  const data = req.body;

  const avatar = req.file;
  if (avatar) {
    data.avatar = avatar;
  }
  logger.info(`Received data from user: `, data);
  const errors = validateSchema(data, codeAndMagicSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  if (avatar) {
    const avatarInfo = {
      path: `/api/wizards/${data.username}/avatar`,
      mimetype: avatar.mimetype
    };
    await wizardsRouter.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
    data.avatar = avatarInfo;
  }

  await wizardsRouter.wizardsStore.save(data);
  dataRenderer.renderDataSuccess(req, res, data);
}));

wizardsRouter.get(`/:name`, async(async (req, res) => {
  const wizardName = req.params.name;

  const found = await wizardsRouter.wizardsStore.getWizard(wizardName);
  if (!found) {
    throw new NotFoundError(`Wizard with name "${wizardName}" not found`);
  }
  res.send(found);
}));

wizardsRouter.get(`/:name/avatar`, async(async (req, res) => {
  const wizardName = req.params.name;

  const wizard = await wizardsRouter.wizardsStore.getWizard(wizardName);

  if (!wizard) {
    throw new NotFoundError(`Wizard with name "${wizardName}" not found`);
  }

  const avatar = wizard.avatar;

  if (!avatar) {
    throw new NotFoundError(`Wizard with name "${wizardName}" didn't upload avatar`);
  }

  const {info, stream} = await wizardsRouter.imageStore.get(avatar.path);

  if (!info) {
    throw new NotFoundError(`File was not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
}));

wizardsRouter.use((exception, req, res, next) => {
  dataRenderer.renderException(req, res, exception);
  next();
});


module.exports = (wizardStore, imageStore) => {
  wizardsRouter.wizardsStore = wizardStore;
  wizardsRouter.imageStore = imageStore;
  return wizardsRouter;
};
