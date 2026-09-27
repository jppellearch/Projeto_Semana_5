/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require('next/jest')();

module.exports = nextJest({
  testEnvironment: 'jsdom',
});