const { jestConfig } = require("@salesforce/sfdx-lwc-jest/config");

module.exports = {
  ...jestConfig,
  modulePathIgnorePatterns: ["<rootDir>/.localdevserver"],
  setupFilesAfterEnv: [
    ...jestConfig.setupFilesAfterEnv,
    "<rootDir>/jest.setupDOM.js"
  ]
};
