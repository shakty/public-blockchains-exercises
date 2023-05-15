// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// This contract does not compile because of a function selector clash.
// Why can it happen? Remember that the function selector is just _the first
// 4 bytes_ of the hashed function signature. It is not so uncommon that 
// there is an accidental match. 

// Luckily you should get a warning from the compiler and from VS Code.
// contract DoesNotCompile {

//     function collate_propagate_storage(bytes16 data) external { }

//     function burn(uint256 data) external { }

// }
