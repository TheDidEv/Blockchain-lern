const { Web3 } = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { abi, evm } = require('./compiler.js');

require('dotenv').config();

const provider = new HDWalletProvider(
    `${process.env.MNEMONIC}`,
    `${process.env.INFURA_URL}`
);

const web3 = new Web3(provider);

const deploy = async () => {
    const account = await web3.eth.getAccounts();
    //console.log("Log account: ", account[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object })
        .send({ gas: '1000000', from: account[0] });

    console.log("Contraact was deployed to: ", result.options.address);
    provider.engine.stop();
}

deploy();
