// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Comment this line for deployment outside of Hardhat blockchains.
import "hardhat/console.sol";

// Create contract > define Contract Name
contract Receiver {

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        console.log('Receiver was called!');
        // console.log(msg.data);
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
        console.log('Fallback was called!');
        // console.log(msg.data);
    }
   
}
