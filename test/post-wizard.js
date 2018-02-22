const request = require(`supertest`);
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
        expect(200, {
          name: `Гендальф Серый`,
          colorCoat: `rgb(56, 159, 117)`,
          colorEyes: `red`,
          colorFireball: `#5ce6c0`,
        });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/wizards`).
        field(`name`, `Гендальф Серый`).
        field(`colorCoat`, `rgb(56, 159, 117)`).
        field(`colorEyes`, `red`).
        field(`colorFireball`, `#5ce6c0`).
        expect(200, {
          name: `Гендальф Серый`,
          colorCoat: `rgb(56, 159, 117)`,
          colorEyes: `red`,
          colorFireball: `#5ce6c0`,
        });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app).post(`/api/wizards`).
        field(`name`, `Гендальф Серый`).
        field(`colorCoat`, `rgb(56, 159, 117)`).
        field(`colorEyes`, `red`).
        field(`colorFireball`, `#5ce6c0`).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(200, {
          name: `Гендальф Серый`,
          colorCoat: `rgb(56, 159, 117)`,
          colorEyes: `red`,
          colorFireball: `#5ce6c0`,
        });
  });


});
