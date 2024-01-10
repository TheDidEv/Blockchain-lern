const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');//Path to our contarct
const source = fs.readFileSync(inboxPath, 'utf-8');

// console.log(solc.compile(source, 1));//1 - кількість екземплярів нашого контракту яка буду скомпільована
module.exports = solc.compile(source, 1).contracts[':Inbox'];
// Поле ':Inbox' - це назва контракту, яку можна дізнатися з console.log у результаті компіляції - перше поле в contracts:{...}