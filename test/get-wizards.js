const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);

describe(`GET /api/wizards`, function () {

  it(`respond with json`, () => {
    return request(app)
        .get(`/api/wizards`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .then((response) => {
          const wizards = response.body;
          assert.equal(wizards.length, 17);
          assert.equal(Object.keys(wizards[0]).length, 5);
        });
  });


});
