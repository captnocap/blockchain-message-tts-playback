// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
    address public owner;

    event Donated(address indexed donor, uint amount, string message);

    constructor() {
        owner = msg.sender;
    }

    function donate(string memory message) public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        emit Donated(msg.sender, msg.value, message);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}