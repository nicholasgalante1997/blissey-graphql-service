import chalk from 'chalk';

export const logger = {
  blue: (m: any) => {
    console.log(chalk.blue(typeof m === 'string' ? m : JSON.stringify(m)));
  },
  red: (m: any) => {
    console.log(chalk.red(typeof m === 'string' ? m : JSON.stringify(m)));
  },
  yellow: (m: any) => {
    console.log(chalk.yellow(typeof m === 'string' ? m : JSON.stringify(m)));
  },
  logGql: (m: any) => {
    console.log(chalk.magenta(typeof m === 'string' ? m : JSON.stringify(m)));
  },
};
