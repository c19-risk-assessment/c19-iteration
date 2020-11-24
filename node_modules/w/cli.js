#!/usr/bin/env node

const program = require('commander');

const wordbox = require('./lib/api');

program.version('1.0.2');

program.command('new <appname> [options...]')
  .description('Create new WordBox app')
  .action((appname, options) => {
    wordbox.newapp(appname, options)
  });

program.command('-h, --help')
  .description('Show w-cli help')
  .action(() => console.log('Show w-cli help'));

program.parse(process.argv);
