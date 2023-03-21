// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock {
    uint256 public immutable unlockTime;
    address payable public owner;
    string public globalVar = "This variable was proudly created by me";
    string public constant GLOBAL_VAR = "This variable was proudly created by me and will not be changed";
    
    
    // uint256 public creationBlock;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        
        console.log("Constructor");

        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);

        // string memory localVar = string.concat("This contract was created at block ", block.number);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        console.log("STE> Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
