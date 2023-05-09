// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Comment this line for deployment outside of Hardhat blockchains.
import "hardhat/console.sol";

contract Sender {

    // This function is no longer recommended for sending Ether.
    function sendViaTransfer(address payable _to) public payable {
        console.log('***Transfer');
        console.log(msg.value);
        
        _to.transfer(msg.value);
    }

    // Send returns a boolean value indicating success or failure.
    // This function is not recommended for sending Ether.
    function sendViaSend(address payable _to) public payable {
        console.log('***Send');
        console.log(msg.value);

        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether via Send");
    }

    // Call returns a boolean value indicating success or failure.
    // This is the current recommended method to use.
    function sendViaCall(address payable _to) public payable {
        console.log('***Call');
        console.log(msg.value);
        
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether via Call");
    }
   
    // Receives ether.
    function donateEther() external payable {
        console.log('Thanks :)');
    }

}
