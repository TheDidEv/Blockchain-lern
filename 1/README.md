# Lern Etherium/solidity

- There I work with sepolia test network.

## Theory

- Bytecode is the intermediate form of the program, which is EVM. This bytecode is then deployed on the Ethereum network, creating an instance of the smart contract.
- ABI (Application Binary Interface) defines the structure of interaction between different software modules, in this case - between a smart contract and the outside world, such as other contracts or external applications. The ABI describes how data must be packaged and passed across contract boundaries to call its functions. In my case, we use the JS language to interact with smart contracts.
- After compiling the smart contract, you get the binary code (bytecode) and its ABI. The bytecode is used to deploy the contract on the blockchain network, and the ABI is used to interact with that contract, describing the available methods, their types, and the order in which they are called.
- The ABI can be used by applications to communicate with the smart contract and call its functions. This allows external applications or other smart contracts to interact with your smart contract by passing parameters and receiving the results of its functions.
- Ethereum gas is what users pay to process transactions or use smart contracts on the Ethereum network.

## Practics

- For start compiling contract

```bash
#Install  solc, i used version solc 0.4.17
npm i solc@0.4.17
#Swithed to 0.8.23(lates)
npm i solc
#For starn compiling
node compiler.js
```

- See comments on compiler.js for understanding how this work.

- For testing contract

```bash
#Install mocha(testing librati), ganache(for creating a local blockchain for fast Ethereum)
npm i mocha ganache web3
```

- On test->Inbox.test.js contains information about `Mocha`

```bash
#For runing test(on package.json need change - script:{"tets": "mocha"})
npm run test
```

- Install wallet provider truffle(used on Deploy.js)

```bash
npm i @truffle/hdwallet-provider
```
