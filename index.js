#!/usr/bin/env node

const readline = require('readline');
const rl = readline.Interface(
    process.stdin,
    process.stdout,
);

const shamsi       = require('shamsi-date-converter'),
      shamsiMonths = require('./data/shamsi.json'),
      miladiMonths = require('./data/miladi.json');

const date = new Date(),
      time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      [filePath, exePath, argv2, argv3] = process.argv;

const days = [
    '',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]

switch (argv2) {
    case '--month': case '-m': {
        if (Number(argv3) <= 12) {
            console.log(
                `${argv3}th Month of:`,
                `\n- Shamsi: ${shamsiMonths[argv3].month}`,
                `\n- Miladi: ${miladiMonths[argv3].month}, ${miladiMonths[argv3].month.substring(0, 3)}`
            );
        }
        else {
            try {
                console.log(
                    shamsiMonths.filter(v => {
                        return v.month.toLowerCase() === argv3.toLowerCase();
                    })[0].eq
                )
            } catch {
                console.log(
                    miladiMonths.filter(v => {
                        return (
                            v.month.toLowerCase() === argv3.toLowerCase() ||
                            v.month.toLowerCase().substring(0,3) === argv3.toLowerCase()
                        )
                    })[0].eq
                )
            }
        }
        break;
    }

    case '--day': case '-d': {

        break;
    }

    case '--syear': case '-sy': {
        // convert shamsi year to miladi
        console.log('Shamsi equivalent:', shamsi.jalaliToGregorian(Number(argv3), 11, 4)[0]);
        break;
    }

    case '--myear': case '-my': {
        // convert miladi year to shamsi
        console.log('Miladi equivalent:', shamsi.gregorianToJalali(Number(argv3), 11, 4)[0]);
        break;
    }

    case undefined: {
        console.log(
            `Date: ${shamsi.gregorianToJalali(date).join('/')} - ${shamsiMonths[shamsi.gregorianToJalali(date)[1]-1].month}, ${days[date.getDay()]}`,
            `\nTime: ${time}`
        );
        break;
    }

    case '--help': case '-h': default: {
        console.log('help');
        break;
    }
}

rl.question('\nPress any key to continue...', () =>
    rl.close()
)