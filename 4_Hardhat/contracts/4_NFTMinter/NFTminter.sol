// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "../BaseAssignment.sol";
import "./INFTminter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTminter is ERC721URIStorage, BaseAssignment, Ownable, INFTminter {
   
    // Use strings methods directly on variables.
    using Strings for uint256;
    using Strings for address;

    uint256 private _nextTokenId;

    // Other variables as needed ...
    uint256 private _totalSupply;
    string private _ipfsHash;
    uint256 private _mintPrice;
    uint256 private _burnPrice;
    bool private isSaleActive;

    constructor(string memory _name, string memory _symbol, string memory _imageHash, address _validatorAddress) ERC721(_name, _symbol) BaseAssignment(_validatorAddress) Ownable(msg.sender) {
        // Constructor code as needed ...
        _nextTokenId = 0;
        _totalSupply = 0;
        _ipfsHash = _imageHash;
        _mintPrice = 1e14;
        _burnPrice = 1e14;
        isSaleActive = true;
    }

    // mint a nft and send to _address
    function mint(address _address) public payable returns (uint256) {
        require(isSaleActive, "Sale is inactive");
        require(isValidator(msg.sender) || msg.value >= _mintPrice, "You did not pay enough ETH to mint an NFT");

        uint256 tokenId = _nextTokenId++;

        // Return token URI
        string memory tokenURI = getTokenURI(tokenId, _address);

        // Mint ...
        ERC721._safeMint(_address, tokenId);
        _totalSupply += 1;
        _nextTokenId += 1;
        _mintPrice *= 2;
    
        // Set encoded token URI to token
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }

    function burn(uint256 tokenId) public payable {
      require(ownerOf(tokenId) == msg.sender, "Only its owner is allowed to burn an NFT");
      require(msg.value >= _burnPrice, "You need to pay the required Burn Fee");
      _burn(tokenId);
      _totalSupply -= 1;
      _mintPrice = 1e14;
    }

    function pauseSale() public {
      require(isValidator(msg.sender) || (owner() == msg.sender), "Only the owner or validator can change the status of the sale");
      isSaleActive = false;
    }

    function activateSale() public {
      require(isValidator(msg.sender) || (owner() == msg.sender), "Only the owner or validator can change the status of the sale");
      isSaleActive = true;
    }

    function getSaleStatus() public view returns (bool) {
      return isSaleActive;
    }

    function withdraw(uint256 amount) public {
      require(isValidator(msg.sender) || (owner() == msg.sender), "Only the owner or validator can withdraw the balance of the contract");
      require(address(this).balance >= amount, "Contract contains less than amount of ETH specified");

      (bool sent, ) = msg.sender.call{value:amount}("");
      require(sent, "Withdrawing ETH was unsuccessful");
    }

    function getPrice() public view returns (uint256) {
      return _mintPrice;
    }

    function getTotalSupply() public view returns (uint256) {
      return _totalSupply;
    }

    function getIPFSHash() public view returns (string memory) {
      return _ipfsHash;
    }

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
            '",', 
            '"hash": "',
            _ipfsHash,
            '",', 
            '"by": "',
            owner(),
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
            _ipfsHash,
            '",', 
            '"by": "',
            owner(),
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
