// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MyContract {
    uint256 public counter;
    address public owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
        counter = 0;
    }

    function increment() public {
        counter += 1;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function expensiveLoop(uint256 iterations) public pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < iterations; i++) {
            sum += i * 2 + 1;
        }
        return sum;
    }
}
