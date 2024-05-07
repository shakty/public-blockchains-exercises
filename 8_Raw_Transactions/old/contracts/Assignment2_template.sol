// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Comment this line for deployment outside of Hardhat blockchains.
// import "hardhat/console.sol";

// Import BaseAssignment.sol
import "./BaseAssignment.sol";

// Create contract > define Contract Name
contract Assignment2_Template is BaseAssignment {

    // State: waiting, starting, playing, revealing, finished.
    string private state = "waiting";

    // Game counter
    uint256 private gameCounter;

    // Player
    address private player1;
    address private player2;

    // Decisions
    string private player1Choice;
    string private player2Choice;

    // Decision Hashed
    bytes32 private player1HashedChoice;
    bytes32 private player2HashedChoice;

    // max time
    uint256 private maxTimeStart = 10;
    uint256 private maxTimePlay = 10;
    uint256 private maxTimeReveal = 10;

    // block number > starting
    uint256 private blockNumberStart;
    uint256 private blockNumberPlay;
    uint256 private blockNumberReveal;

    
    constructor(address _validator) BaseAssignment(_validator) {}


    function reset() private {
        // Set to waiting state
        state = "waiting";

        // Reset game
        player1 = address(0);
        player2 = address(0);

        // Reset choices
        player1Choice = "";
        player2Choice = "";

        // Reset hashed choices
        player1HashedChoice = 0;
        player2HashedChoice = 0;

        // Reset block numbers
        blockNumberStart = getBlockNumber();
        blockNumberPlay = getBlockNumber();
        blockNumberReveal = getBlockNumber();
    }

    function forceReset() public {
        require(isValidator(msg.sender), "You are not a validator");

        reset();
    }


    /*=============================================
    =            HELPER METHOD            =
    =============================================*/

    // Hint:
    // https://docs.soliditylang.org/en/latest/abi-spec.html
    // https://ethereum.stackexchange.com/questions/119583/when-to-use-abi-encode-abi-encodepacked-or-abi-encodewithsignature-in-solidity

    function checkRevealed(string memory seed, string memory plainChoice, bytes32 hashedChoice)
        public
        pure
        returns (bool)
    {
       
        string memory concatString = string.concat(seed, "_", plainChoice);

        // console.log(concatString);

        bytes32 hashedConcatString = keccak256(abi.encodePacked(concatString));

        // console.logBytes32(hashedConcatString);

        return hashedConcatString == hashedChoice;
    }

    /*=====  End of HELPER  ======*/
}
