// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Comment this line for deployment outside of Hardhat blockchains.
import "hardhat/console.sol";

// Create contract > define Contract Name
contract Receiver {

    // Special functions to receive Ether:
    
    // Checkpoint: no function keyword. Why? What if they would?

    // receive: called if msg.data is empty.
    receive() external payable {
        console.log('Receiver was called!');
    }

    // fallback: called if msg.data is _not_ empty.
    fallback() external payable {
        console.log('Fallback was called!');
    }

    // Custom functions to receive Ether:

    // any other function with payable modifier.
    function donateEther() external payable {
        console.log('Thanks :)');
    }
   
}
