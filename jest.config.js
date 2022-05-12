module.exports = {
  preset: "ts-jest",
  globalTeardown: "./scripts/jest/teardown.js",
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["<rootDir>/src/**"],
  coverageThreshold: {
    global: {
      branches: 12.5,
      functions: 73.33,
      lines: 85.71,
      statements: 85.71
    }
  },
  coveragePathIgnorePatterns: ["index.ts", "/node_modules/", "__mock__", "src/config", "src/bin", "fixture.ts", "src/db"]
};
