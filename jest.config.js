module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?$|jsx?$)',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  modulePaths: [
    "<rootDir>"
  ]
};
