// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Comment this line for deployment outside of Hardhat blockchains.
import "hardhat/console.sol";

// Create contract > define Contract Name
contract LogicV1 {

    // It actually needs all variables in Proxy, _in the same order_.

    address private implementation;

    uint256 private secretNumber;

    uint256 public version = 1;

    // The function to check the guess is wrong here.
    function checkGuess(uint256 number) view public returns(bool) {
        console.log('****Logic version', version);
        console.log('****Secret number', secretNumber);
        return (number+1) == secretNumber;
    }
   
}
