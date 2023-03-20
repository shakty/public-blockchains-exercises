// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Lock4 {
    
    event Withdrawal(uint amount, uint when);
    event WithdrawalAttempt(uint amount, uint when, address fromWho);

    uint8 constant CAN_WITHDRAW = 1;
    uint8 constant HAS_WITHDRAWN = 2;

    mapping(address => uint8) public owners;
    
    // Mappings do not have length, so we need to track it manually.
    // Types have default values, if not initialized uint* are set to zero. 
    uint256 public ownerCounter;

    constructor() payable {
        owners[msg.sender] = 1;
        ownerCounter = 1;
    }

    function addOwner(address newOwner) public returns (bool) {
        newOwner = payable(newOwner);
        // Already inited.
        if (owners[newOwner] > 0) {
            return false;
        }
        // New owner.
        owners[newOwner] = CAN_WITHDRAW;
        ownerCounter += 1;
        return true;
    }

    function withdraw() public {

        console.log("LOG>", owners[msg.sender]);

        emit WithdrawalAttempt(address(this).balance, block.timestamp, msg.sender);

        require(owners[msg.sender] > 0, "You are not one of the owners");
        require(owners[msg.sender] == 1, "You have already withdrawn");

        // Compute amount and send it.
        uint256 amount = address(this).balance / ownerCounter;
        emit Withdrawal(amount, block.timestamp);
        payable(msg.sender).transfer(amount);

        // Update stats.
        owners[msg.sender] = HAS_WITHDRAWN;
        ownerCounter -= 1;
    }
}
