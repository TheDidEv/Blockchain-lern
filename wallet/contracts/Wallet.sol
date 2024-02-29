//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

contract Wallet {
    address owner;
    uint256 balance = 0;
    
    constructor(){
        owner = msg.sender;
    }

    function addBalance() public payable {
        balance += msg.value;
    }

    function getBalanse(uint256 amount) public payable {

        require(msg.sender == owner, "Only the owner can call this function");
        require(balance >= amount, "Insufficient balance");

        balance -= amount;
        payable(owner).transfer(amount);
    }
}