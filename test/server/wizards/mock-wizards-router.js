const createWizardsRouter = require(`../../../src/server/wizards/route`);
const wizardsGenerator = require(`./wizards-generator`);

const wizards = wizardsGenerator.generate();

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockWizardStore {
  constructor() {
  }

  async getWizard(username) {
    return wizards.find((it) => it.name.toLowerCase() === username);
  }

  async getAllWizards() {
    return new Cursor(wizards);
  }

  async save() {
  }

}

class MockImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }

}

module.exports = createWizardsRouter(new MockWizardStore(), new MockImageStore());
