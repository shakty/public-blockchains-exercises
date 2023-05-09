// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BankWithGuard {

    bool internal locked;

    modifier guard() {
        require(!locked, "No re-entrancy");
        locked = true;

        // This strange instruction means continue with the next task.
        _;
        
        locked = false;
    }

    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public guard {
        uint bal = balances[msg.sender];
        require(bal > 0);

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }
}