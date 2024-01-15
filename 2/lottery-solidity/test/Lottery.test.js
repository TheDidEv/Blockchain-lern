const ganache = require('ganache');
const assert = require('assert');
const { abi, evm } = require('../compiler');
const { Web3 } = require('web3');

const web3 = new Web3(ganache.provider());//provider - дозволяє нам підключитися до будь-якої мережі.

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery contract', () => {
    it('deploys contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allow one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
        console.log('Accounts: ', players);
    });



    it('allow many account', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
        console.log('Accounts: ', players);
    });

    it('requires a minimum amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[10],
                value: 200
            });
            assert(false);
        } catch (error) {
            assert.ok(error);
        }
    });

    it('only manager can call pickWinner', async () => {// цю функцію може викликати тільки менеджер lottery
        //якщо цю функцює захоче виклимати не менеджер то тест пройде
        try {
            await lottery.pickWinner().send({
                from: accounts[1],
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });



    it('sends money to the weinner and reset the players array', async () => {// ent-to-end test
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        //getBalance - for get etherium count on account balance 
        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWiner().send({ from: accounts[0] });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance - initialBalance;
        console.log(finalBalance - initialBalance);
        assert(difference > web3.utils.toWei('1.8', 'ether'));
    });
});