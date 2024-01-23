// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract CompaingFactory {
    address[] public deployedCampaings;

    function createCampaign(uint256 minimum) public {
        Compaing newCampaing = new Compaing(minimum, msg.sender);
        deployedCampaings.push(address(newCampaing));
    }

    function getDEployedCompaing() public view returns (address[] memory) {
        return deployedCampaings;
    }
}

contract Compaing {
    struct Request {
        string description;
        uint256 value;
        address recipient; //we send money here
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
    uint256 public approversCount;

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum; //it`s not ether, it`s wai
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
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

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request[index].complete);

        request.recipient.transfer(request.value);
        request[index].complete = true;
    }
}
