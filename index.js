#! node

const shamsi = require('shamsi-date-converter');
const date = new Date();
const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

console.log(`\n    Date: ${shamsi.gregorianToJalali(date).join('/')}\n    Time: ${time}\n`);