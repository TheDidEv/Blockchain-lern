// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Compaing {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;

    constructor(uint256 minimum) {
        manager = msg.sender;
        minimumContribution = minimum; //it`s not ether, it`s wai
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) public restricted {
        require(approvers[msg.sender]); //check bool variable

        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request[index].aprovals[msg.sender]);

        request[index].approvals[msg.sender] = true;
        request[index].approvalCount++;
    }
}
