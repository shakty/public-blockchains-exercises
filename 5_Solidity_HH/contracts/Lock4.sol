// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock4 {

    event Withdrawal(uint amount, uint when);

    uint8 constant IS_OWNER = 1;
    uint8 constant HAS_WITHDRAWN = 2;

    mapping (address => uint8) public owners;

    uint public totalOwners;

    constructor() payable {
        owners[msg.sender] = IS_OWNER;
        totalOwners = 1;
    }

    function addOwner(address newOwner) public returns (bool) {
      newOwner = payable(newOwner);
      if (owners[newOwner] > 0) {
        return false;
      }

      owners[newOwner] = IS_OWNER;
      totalOwners += 1;
      return true;
    }

    function withdraw() public {

        require(owners[msg.sender] > 0, 'You are not one of the owners of this Lock');
        require(owners[msg.sender] == 1, 'You have already withdrawn your balance');

        uint256 amount = address(this).balance / totalOwners;
        emit Withdrawal(amount, block.timestamp);
        payable(msg.sender).transfer(amount);

        owners[msg.sender] = HAS_WITHDRAWN;
        totalOwners -= 1;
    }
}
