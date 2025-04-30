// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


// TODO: inherit BaseAssignment and implement INFTminter.

contract NFTminter_template is ERC721URIStorage {
   
    // Use strings methods directly on variables.
    using Strings for uint256;
    using Strings for address;

    uint256 private _nextTokenId;

    // Other variables as needed ...

    constructor() ERC721("Token", "TKN") {
        // Constructor code as needed ...
    }

    // mint a nft and send to _address
    function mint(address _address) public payable returns (uint256) {
       
        uint256 tokenId = _nextTokenId++;

        // Return token URI
        string memory tokenURI = getTokenURI(tokenId, _address);

        // Mint ...
    
        // Set encoded token URI to token
        // _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }


    // Other methods as needed ...

    /*=============================================
    =                   HELPER                  =
    =============================================*/

    // Get tokenURI for token id
    function getTokenURI(uint256 tokenId, address newOwner)
        public
        view
        returns (string memory)
    {

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "My beautiful artwork #',
            tokenId.toString(),
            '"', 
            '"hash": "',
            // TODO: hash
            "SOME_HASH",
            '",', 
            '"by": "',
            // TODO: owner,
            "0x_OWNER",
            '",', 
            '"new_owner": "',
            newOwner,
            '"', 
            "}"
        );

        // Encode dataURI using base64 and return
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }


      // Get tokenURI for token id using string.concat.
    function getTokenURI2(uint256 tokenId, address newOwner)
        public
        view
        returns (string memory)
    {

        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "My beautiful artwork #',
            tokenId.toString(),
            '",', 
            '"hash": "',
            // TODO: hash
            "SOME_HASH",
            '",', 
            '"by": "',
            // TODO: owner,
            "0x_OWNER",
            '",', 
            '"new_owner": "',
            newOwner,
            '"', 
            "}"
        );

        // Encode dataURI using base64 and return
        return string.concat("data:application/json;base64,",
                                Base64.encode(dataURI));
    }

    // Not actually needed by assignment, but you can try it out 
    // to learn about strings.
    function strlen(string memory s) public pure returns (uint) {
        uint len;
        uint i = 0;
        uint bytelength = bytes(s).length;
        for(len = 0; i < bytelength; len++) {
            bytes1 b = bytes(s)[i];
            if(b < 0x80) {
                i += 1;
            } else if (b < 0xE0) {
                i += 2;
            } else if (b < 0xF0) {
                i += 3;
            } else if (b < 0xF8) {
                i += 4;
            } else if (b < 0xFC) {
                i += 5;
            } else {
                i += 6;
            }
        }
        return len;
    }

}
