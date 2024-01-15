// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Lottery {
    address public manager;
    address payable[] public players;

    constructor() public {
        manager = msg.sender; //the address of the user who called the instance of the contract
    }

    function enter() public payable {
        //payable - we nee pay(eth) whene we will use this function

        //this is boolean exoression, if return false - exit from funciton
        //in this example we cheking, that the value more then 0.01 etherium(on user balance)
        require(msg.value > .01 ether);
        players.push(payable(msg.sender)); //the addres of the user who called this function
    }

    function random() private view returns (uint256) {
        //sha3, keccak256 - hashing algo
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            ); //abi.encodePacked - for packin in one byte array, becose keccak256 - can accept one argument
    }

    function pickWiner() public restricted {
        //закоментували require бо використовужмо restricted
        //require(msg.sender == manager); //ніхто окрім менеджера не зможе викликати цю функцію

        uint256 index = random() % players.length;
        address payable winner = players[index];

        // Отримання балансу контракту і використання address(this).balance
        winner.transfer(address(this).balance);

        // Очистіть список гравців після визначення переможця
        players = new address payable[](0);
    }

    function getPlayers() public view returns (address payable[] memory) {//використовуємо memory щоб повернути динамічний масив
        return players;
    }

    modifier restricted() {
        //використовуємо modifier щоб позбутися повторення в коді
        require(msg.sender == manager);
        _;
    }
}
