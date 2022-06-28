/** @type {import('cz-git').UserConfig} */
const { execSync } = require( 'child_process' );



module.exports = {
  extends: [ '@commitlint/config-conventional' ],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    types: [
      {
        value: 'feat',
        name: 'feat:     ✨  A new feature',
        emoji: ':sparkles:',
      },
      { value: 'fix', name: 'fix:      🐛  A bug fix', emoji: ':bug:' },
      {
        value: 'docs',
        name: 'docs:     📝  Documentation only changes',
        emoji: ':memo:',
      },
      {
        value: 'style',
        name: 'style:    💄  Changes that do not affect the meaning of the code',
        emoji: ':lipstick:',
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️   A code change that neither fixes a bug nor adds a feature',
        emoji: ':recycle:',
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️  A code change that improves performance',
        emoji: ':zap:',
      },
      {
        value: 'test',
        name: 'test:     ✅  Adding missing tests or correcting existing tests',
        emoji: ':white_check_mark:',
      },
      {
        value: 'build',
        name: 'build:    📦️   Changes that affect the build system or external dependencies',
        emoji: ':package:',
      },
      {
        value: 'chore',
        name: "chore:    🔨  Other changes that don't modify src or test files",
        emoji: ':hammer:',
      },
      {
        value: 'revert',
        name: 'revert:   ⏪️  Reverts a previous commit',
        emoji: ':rewind:',
      },
    ],
    scopes: [
      { value: "app", name: "app:       Overall function" },
      { value: "ui", name: "ui:        UI/Layout/Components" },
      { value: "api", name: "api:       API Changes" },
      { value: "db", name: "db:        Database" },
      { value: "build", name: "build:     Build System/Workflows" },
      { value: "deps", name: "deps:      Dependencies" },
      { value: "conf", name: "config:    Config changes" },
    ],
    useEmoji: true,
    enableMultipleScopes: true,
    allowEmptyScopes: false,
    // maxSubjectLength: 72,
  },
};