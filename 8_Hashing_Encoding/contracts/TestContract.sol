// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Comment this line for deployment outside of Hardhat blockchains.
// import "hardhat/console.sol";

// Create contract > define Contract Name
contract TestContract {

    // State: waiting, starting, playing, revealing, finished.
    string public greeting = "Hello!";

    function setGreeting(string  memory _greeting) public {
        greeting = _greeting;
    }

    function setGreeting(uint8 choice) public {
        
        // console.log(choice);

        if (choice == 1) {
            greeting = "Bonjour";
        }
        else if (choice == 2) {
            greeting = "Guten Tag";
        }
        else if (choice == 3) {
            // What language is this?
            greeting = "Sannu";
        }
        else {
            reset();
        }
    }

    function reset() public {
        greeting = "Hello!";
    }

   
}
