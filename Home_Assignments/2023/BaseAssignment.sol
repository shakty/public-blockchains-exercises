// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IBaseValidator {
    function isValidator(address _address) external view returns (bool);

    // INIT FUNCTIONS FOR VALIDATION
    function setAssignmentCreationBlockNumber() external;

    function setAssignmentOwner() external;
}

/*=============================================
=                 BaseAssignment                 =
=============================================*/

contract BaseAssignment {
    // METADATA STORAGE
    address public _owner; // Owner of the contract
    address public _validator; // Address of the validator

    // IGNORE
    uint256 private _testBlockNumber; // For test purposes

    constructor(address validator) {
        _owner = msg.sender;
        _validator = validator;

        // Make sure that the validator address is not default
        require(
            _validator != address(0),
            "Address of Validator Contract is not set"
        );

        // Register contract in validator
        IBaseValidator(_validator).setAssignmentCreationBlockNumber();
        IBaseValidator(_validator).setAssignmentOwner();
    }

    // Get owner of the contract
    function getOwner() public view returns (address) {
        return _owner;
    }

    // Get the current block number (for test purposes)
    function getBlockNumber() public view returns (uint256) {
        if (isValidator(msg.sender)) return _testBlockNumber;
        else return block.number;
    }

    // return if the current tester is a validator
    function isValidator(address _address) public view returns (bool) {
        require(_validator != address(0), "Validator address is not set");

        if (IBaseValidator(_validator).isValidator(_address)) return true;
        else return false;
    }

    // Set the "current" block number (for test purposes)
    function setBlockNumber(uint256 blockNumber) public {
        require(
            IBaseValidator(_validator).isValidator(msg.sender),
            "BaseAssignment: setBlockNumber: Only validator can call this function"
        );

        _testBlockNumber = blockNumber;
    }

    // SPECIAL FUNCTIONS FOR ASSIGNMENT 4 (STATE CHANNEL)

    struct Signature {
        bytes signature;
        uint256 ethAmount;
    }

    mapping(uint256 => Signature) public signatures;

    function addSignature(
        uint256 index,
        bytes memory signature,
        uint256 ethAmount
    ) public {
        require(
            IBaseValidator(_validator).isValidator(msg.sender) ||
                msg.sender == _owner,
            "BaseAssignment: addSignature: Only validator or owner can call this function"
        );

        require(
            index >= 0 && index < 5,
            "Index out of range. Only 5 signatures allowed (index 0 to 4)"
        );

        signatures[index] = Signature(signature, ethAmount);
    }

    function getSignature(uint256 index) public view returns (bytes memory) {
        require(
            IBaseValidator(_validator).isValidator(msg.sender) ||
                msg.sender == _owner,
            "BaseAssignment: getSignature: Only validator or owner can call this function"
        );

        return signatures[index].signature;
    }

    function getSignatureEthAmount(uint256 index)
        public
        view
        returns (uint256)
    {
        require(
            IBaseValidator(_validator).isValidator(msg.sender) ||
                msg.sender == _owner,
            "BaseAssignment: getSignatureEthAmount: Only validator or owner can call this function"
        );

        return signatures[index].ethAmount;
    }
}

/*=====       End of BaseAssignment        ======*/
