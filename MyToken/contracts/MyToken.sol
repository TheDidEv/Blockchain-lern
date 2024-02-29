// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// import ERC20 from openzeppelin for to use Inheritance for our contract
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MyToken is ERC20{

    // We must call constructor for ERC20 and set the name for our token
    constructor() ERC20("My Token", "MT") {
        // (from ERC20) Increases the total stock by the amount we specify
        // and this increases the balance of this user, for who we would like to Mint it
        // The _mint parameters include the address of the recipient and the number of tokens to be issued.
        _mint(msg.sender, 100);
    }
}