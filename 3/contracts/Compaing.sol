// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Compaing {
    struct Request {
        string  description;
        uint256 value;
        address recipient;
        bool    complete;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    Request[] public request;
    address public manager;
    uint256 public minimumContribution;
    address[] public approvers;

    constructor(uint256 minimum) {
        manager = msg.sender;
        minimumContribution = minimum; //it`s not ether, it`s wai
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers.push(msg.sender);
    }

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) public restricted {
        Request memory newRequest = Request({
            description: description,
            value:       value,
            recipient:   recipient,
            complete:    false
        });

        request.push(newRequest);
    }
}
