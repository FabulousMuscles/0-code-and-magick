const {validate} = require(`../../../src/server/util/validator`);

const schema = require(`../../../src/server/wizards/validation`);
const assert = require(`assert`);

const assertField = (fieldName, fieldValue, ...errorMessages) => {

  const expected = errorMessages.map((errorMessage) => ({
    fieldName, fieldValue, errorMessage
  }));

  const actual = validate({[fieldName]: fieldValue}, fieldName, schema[fieldName]);

  assert.deepEqual(actual, expected);
};

describe(`validate code-and-magick fields`, () => {
  describe(`'username' field validation`, () => {
    const fieldName = `username`;

    it(`should require field`, () => {
      assertField(fieldName, void 0, `is required`);
      assertField(fieldName, null, `is required`);
      assertField(fieldName, ``, `is required`);
    });

    it(`should not be less than 2 symbols`, () => {
      assertField(fieldName, `1`, `should be in range 2..25`);
    });

    it(`should trim passed string`, () => {
      assertField(fieldName, `1 `, `should be in range 2..25`);
      assertField(fieldName, ` 1`, `should be in range 2..25`);
      assertField(fieldName, ` 1 `, `should be in range 2..25`);
    });

    it(`should not be more than 25 symbols`, () => {
      assertField(fieldName, Array(26).fill(`1`).join(``), `should be in range 2..25`);
    });
  });
});
