// pragma solidity ^0.8.23;
pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    //в solidity 0.4.17 використовуємо funciton Inbox(...)... як конструктор
    //memory - вказує що дані будуть зберігатися в памяті
    //storage - вказує що дані будуть зберігатися в якомусь постійному сховищі, але це не є частою практикою
    constructor(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessasge(string memory newMessage) public {
        message = newMessage;
    }
}
