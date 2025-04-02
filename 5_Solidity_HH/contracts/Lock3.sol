// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock3 {
    uint256 public immutable unlockTime;
    address payable public owner;
    string public constant description = 'This is a lock for ETH';
    uint public immutable blockNumber;

    event Withdrawal(uint amount, uint when);
    event WithdrawalAttempt(address attempter);

    constructor() payable {
        blockNumber = block.number;
        unlockTime = block.timestamp + 1;
        owner = payable(msg.sender);
        console.log("You will be able to withdaw %o after %o", address(this).balance, unlockTime);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        emit WithdrawalAttempt(msg.sender);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
