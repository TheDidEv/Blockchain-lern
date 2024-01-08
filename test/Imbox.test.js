const assert = require('assert');//Assert is standard library into the Node.js. Assert is used for making assertions about tests.
const ganache = require('ganache');//for creating a local blockchain for fast Ethereum
const { Web3 } = require('web3')

const web3 = new Web3(ganache.provider());







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