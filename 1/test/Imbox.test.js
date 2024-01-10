const assert = require('assert');//Assert is standard library into the Node.js. Assert is used for making assertions about tests.
const ganache = require('ganache');//for creating a local blockchain for fast Ethereum
const { Web3 } = require('web3');
const { interface, bytecode } = require('../compiler');

const web3 = new Web3(ganache.provider());//instance of Web3

let accounts;
let inbox;

beforeEach(async () => {
    //get a list of all accounts
    //eth - etherium
    accounts = await web3.eth.getAccounts();
    // accounts = web3.eth.getAccounts().then(fethedAccounts => {
    //     console.log(fethedAccounts);//output 10 randomly generated on local network
    // });

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Initial message in contract'] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploy contract', () => {
        console.log("Accounts: ", accounts);//output 10 randomly generated on local network
        console.log("Inbox contract: ", inbox);//data about contract
    });
});








// //Test librari Mocha
// //Class for testing
// class Car {
//     park() {
//         return "stopped";
//     }

//     drive() {
//         return "drive"
//     }
// }

// //was completed before we start testing with - describe
// //was caled before every it(...) on describe
// let car;
// beforeEach(() => {
//     car = new Car;
// });
// //testing with mocha
// describe('Car class', () => {
//     //test park() method
//     it('can_park', () => {
//         assert.equal(car.park(), "stopped");//assert.equal - from standart nodejs librari - assert
//     });

//     //test drive() method
//     it('can_drive', () => {
//         assert.equal(car.drive(), "drive");
//     });
// });