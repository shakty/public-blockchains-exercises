// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/*=============================================
=                Assignment Helper            =
=============================================*/

contract EmptyValidator {    

     // Contract msg sender tracker
    mapping(address => address) _assignmentOwner;
    
    // Contract creation block number tracker
    mapping(address => uint256) _assignmentCreationBlockNumber;

    /**
     * Set admin address.
     */
    function setAssignmentOwner() public {
        if (_assignmentOwner[msg.sender] == address(0)) {
            _assignmentOwner[msg.sender] = tx.origin;
        }
    }

    /**
     * Set block number of contract creation
     */
    function setAssignmentCreationBlockNumber() public {
        if (_assignmentCreationBlockNumber[msg.sender] == 0) {
            _assignmentCreationBlockNumber[msg.sender] = block.number;
        }
    }

}

