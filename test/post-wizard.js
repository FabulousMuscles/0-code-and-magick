const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);

describe(`POST /api/wizards`, function () {

  it(`should consume JSON`, () => {
    return request(app).post(`/api/wizards`).
        send({
          name: `Гендальф Серый`,
          colorCoat: `rgb(56, 159, 117)`,
          colorEyes: `red`,
          colorFireball: `#5ce6c0`,
        }).
        expect(200).
        then((response) => {
          const wizards = response.body;
          assert.equal(wizards.length, 17);
          assert.equal(Object.keys(wizards[0]).length, 5);
        });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/wizards`).
        field(`name`, `Гендальф Серый`).
        expect(200).
        then((response) => {
          const wizards = response.body;
          assert.equal(wizards.length, 17);
          assert.equal(Object.keys(wizards[0]).length, 5);
        });
  });


});
