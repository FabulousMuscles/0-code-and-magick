const request = require(`supertest`);
const mockWizardsRouter = require(`./mock-wizards-router`);
const app = require(`express`)();

app.use(`/api/wizards`, mockWizardsRouter);

describe(`POST /api/wizards`, function () {

  it(`should consume JSON`, () => {
    return request(app).post(`/api/wizards`).
        send({
          username: `Гендальф Серый`,
          coatColor: `rgb(56, 159, 117)`,
          eyeColor: `red`,
          fireballColor: `#5ce6c0`,
        }).
        expect(200, {
          username: `Гендальф Серый`,
          coatColor: `rgb(56, 159, 117)`,
          eyeColor: `red`,
          fireballColor: `#5ce6c0`,
        });
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/wizards`).
        field(`username`, `Гендальф Серый`).
        field(`coatColor`, `rgb(56, 159, 117)`).
        field(`eyeColor`, `red`).
        field(`fireballColor`, `#5ce6c0`).
        expect(200, {
          username: `Гендальф Серый`,
          coatColor: `rgb(56, 159, 117)`,
          eyeColor: `red`,
          fireballColor: `#5ce6c0`,
        });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app).post(`/api/wizards`).
        field(`username`, `Гендальф Серый`).
        field(`coatColor`, `rgb(56, 159, 117)`).
        field(`eyeColor`, `red`).
        field(`fireballColor`, `#5ce6c0`).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(200, {
          username: `Гендальф Серый`,
          coatColor: `rgb(56, 159, 117)`,
          eyeColor: `red`,
          fireballColor: `#5ce6c0`,
          avatar: {
            path: `/api/wizards/Гендальф Серый/avatar`,
            mimetype: `image/png`
          }
        });
  });

  it(`should fail if username is invalid`, () => {
    return request(app).post(`/api/wizards`).
        field(`username`, `Г`).
        field(`coatColor`, `rgb(56, 159, 117)`).
        field(`eyeColor`, `red`).
        field(`fireballColor`, `#5ce6c0`).
        attach(`avatar`, `test/fixtures/keks.png`).
        expect(400, [{
          fieldName: `username`,
          fieldValue: `Г`,
          errorMessage: `should be in range 2..25`
        }]);
  });


});
