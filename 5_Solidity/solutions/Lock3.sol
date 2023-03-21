// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock3 {
    uint256 public immutable unlockTime;
    address payable public owner;
    string public globalVar = "This variable was proudly created by me";
    string public constant GLOBAL_VAR = "This variable was proudly created by me and will not be changed";
    uint256 public immutable blockNumber;
    
    // uint256 public creationBlock;

    event Withdrawal(uint amount, uint when);
    event WithdrawalAttempt(uint amount, uint when, address fromWho);

    constructor() payable {
        blockNumber = block.number;
        unlockTime = 1710862742;
        owner = payable(msg.sender);
    }

    function withdraw() public {

        emit WithdrawalAttempt(address(this).balance, block.timestamp, msg.sender);

        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        // require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
