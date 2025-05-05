// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GasTest {

    uint256[] public storageArray; // This is stored in `storage`

    // STORAGE
    function useStorage(uint256 _value) public {
        storageArray.push(_value); 
    }

    // MEMORY (value)
    function useMemoryVal(uint256 _value) public pure returns(uint256[] memory) {
        uint256[] memory tempArray = new uint256[](1); // Need to initialize.
        tempArray[0] = _value;
        return tempArray;
    }   

    // MEMORY + STORAGE
    function useMemoryAndStorage(uint256 _value) public {
        uint256[] memory tempArray = new uint256[](1); // Need to initialize.
        tempArray[0] = _value;

        storageArray.push(tempArray[0]);
    }

    // MEMORY (array)
    function useMemoryArr(uint256[] memory input) public pure returns(uint256) {
         require(input.length > 0, "Empty array");
        return input[0] * 2; // simple read + operation
    }

    // CALLDATA (array)
    function useCalldata(uint256[] calldata input) public pure returns (uint256) {
        require(input.length > 0, "Empty array");
        return input[0] * 2; // simple read + operation
    }

    // MEMORY (return memory)
    function useMemoryReturnMemory(string memory _str) public pure returns(string memory) {
        return _str;
    }

    // CALLDATA (return calldata)
    function useCalldataReturnCalldata(string calldata _str) public pure returns(string calldata) {
        return _str;
    }   

    // STACK.
    function useStack(uint256 _value) public pure returns(uint256) {
        uint256 result = _value * 2; // The variable 'result' is stored on the stack
        return result;
    }

}
