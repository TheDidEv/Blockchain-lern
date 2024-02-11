const HDWalletProvide = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
// const { abi, evm } = require('./compiler');
const compiledFactory = require("./build/CampaignFactory.json");

require("dotenv").config();

const provider = new HDWalletProvide(
  //pneumonic(secret phrase)(example: word1 word2 word3 ... word12)
  `${process.env.MNEMONIC}`,
  //provider should connect to an infra node. (this link get on infura)(example: https://sepolia.infura.io/v3/124312312v12312v124g12u)
  `${process.env.INFURA_URL}`
);

const web3 = new Web3(provider);

const deploy = async () => {
  const account = await web3.eth.getAccounts();

  console.log("Log deploy account", account[0]);

  //contract deployment
  const result = await new web3.eth.Contract(compiledFactory.interface)
    .deploy({ data: compiledFactory.bytecode, arguments: ["Hi there"] })
    .send({ gas: "1000000", from: account[0] });

  console.log("contract deployed to", result.options.address);
  provider.engine.stop(); //to prevent deployment from hanging in the terminal
};

deploy();
