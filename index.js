#! node

const shamsi       = require('shamsi-date-converter'),
      shamsiMonths = require('./data/shamsi.json'),
      miladiMonths = require('./data/miladi.json');

const date = new Date(),
      time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      [filePath, exePath, argv2, argv3] = process.argv;

switch (argv2) {
    case '-m': {
        if (Number(argv3) <= 12) {
            console.log(
                `${argv3}th Month of:`,
                `\n- Shamsi: ${shamsiMonths[argv3].month}`,
                `\n- Miladi: ${miladiMonths[argv3].month}, ${miladiMonths[argv3].month.substring(0, 3)}s`
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

    case '-d':

        break;
    case '-y':

        break;
    case '-h': case ' ':

        break;

    default:
        console.log(
            `Date: ${shamsi.gregorianToJalali(date).join('/')}`,
            `\nTime: ${time}`
        );
        break;
}
// } 