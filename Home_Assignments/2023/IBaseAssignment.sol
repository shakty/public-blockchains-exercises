// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/*=============================================
=               BaseAssignment                = 
=============================================*/

abstract contract IBaseAssignment {
    // Get owner of the contract
    function getOwner() public virtual returns (address) {}

    // Get the current block number (for test purposes)
    function getBlockNumber() public virtual returns (uint256) {}

    // return if the current tester is a validator
    function isValidator(address _address) public virtual returns (bool) {}

    // Set the "current" block number (for test purposes)
    function setBlockNumber(uint256 blockNumber) public virtual {}

    // SPECIAL FUNCTIONS FOR ASSIGNMENT 4 (STATE CHANNEL)

    struct Signature {
        bytes signature;
        uint256 ethAmount;
    }

    function addSignature(
        uint256 index,
        bytes memory signature,
        uint256 ethAmount
    ) public virtual {}

    function getSignature(uint256 index)
        public
        virtual
        returns (bytes memory)
    {}

    function getSignatureEthAmount(uint256 index)
        public
        virtual
        returns (uint256)
    {}
}

/*=====       End of BaseAssignment        ======*/
