import web3 from './web3';

//Tere we export instance of contract object.


//find the Ethereum contract by address on blockchain network
// отримали це в ./lottery-slidity/deploy.js->    console.log("Contraact was deployed to: ", result.options.address);
const address = '0x5588d81EB5B1e757eBa01491B6744552e000b37a';

// Ця змінна abiмістить ABI (двійковий інтерфейс програми) контракту, який визначає методи та структури даних, які надає контракт.
// отримали це в ./lottery-slidity/deploy.js->    console.log(JSON.stringify(abi));
const abi = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    { "inputs": [], "name": "enter", "outputs": [], "stateMutability": "payable", "type": "function" },
    { "inputs": [], "name": "getPlayers", "outputs": [{ "internalType": "address payable[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "manager", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "pickWiner", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "players", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }
]

export default new web3.eth.Contract(abi, address);