const generateCommand = require(`../src/cli/generate`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const assert = require(`assert`);

describe(`Generate JSON command`, function () {
  it(`should fail on not existing folder`, function () {
    const tempFileName = `${__dirname}/folder/testfile.json`;
    return generateCommand.execute(tempFileName).then(() => {
      assert.fail(`Path ${tempFileName} should not be available`);
    }).catch((e) => assert.ok(e));
  });

  it(`should create new file`, function () {
    const tempFileName = `${__dirname}/testfile.json`;
    return generateCommand.execute(tempFileName)
        .then(() => access(tempFileName))
        .then(() => unlink(tempFileName));
  });
});
