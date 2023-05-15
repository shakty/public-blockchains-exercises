// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Comment this line for deployment outside of Hardhat blockchains.
import "hardhat/console.sol";

// Create contract > define Contract Name
contract Proxy {

    address private implementation;

    uint256 private secretNumber;

    uint256 public version = 1;

    constructor(address _implementation, uint256 _secretNumber) {
        implementation = _implementation;
        secretNumber = _secretNumber;
    }

    function upgrade(address _implementation) public {
        
        implementation = _implementation;

        // Increment version number each time we change implementation.
        version++;
    }

    function guessNumber(uint256 number) public returns(bool) {
        console.log("Guessing the number", number);
        (bool success, bytes memory data) = implementation.delegatecall(
            abi.encodeWithSignature("checkGuess(uint256)", number)
        );
        require(success);
        bool correct = abi.decode(data, (bool));
        console.log("Result:", correct);
        return correct;
    }
   
}
