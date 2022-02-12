#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference');

program
  .option('-f, --format <type>', 'output format');

program
  .argument('<filepath1>')
  .argument('<filepath2>');

program
  .action(() => {
    const [path1, path2] = program.args;
    console.log(genDiff(path1, path2));
  });

program.parse();
