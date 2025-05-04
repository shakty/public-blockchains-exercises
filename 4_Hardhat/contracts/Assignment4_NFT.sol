// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./INFTminter.sol";
import "./BaseAssignment.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



// TODO: inherit BaseAssignment and implement INFTminter.

contract NFTminter is ERC721URIStorage, INFTminter, BaseAssignment, Ownable {
   
    // Use strings methods directly on variables.
    using Strings for uint256;
    using Strings for address;
    uint256 private _totalSupply;
    uint256 private _mintPrice = 0.0001 ether;
    uint256 private _burnPrice = 0.0001 ether;
    bool private isSaleActive = true;

    uint256 private _nextTokenId;
    string private _ipfsHash;

 
    
    

    // Other variables as needed ...

    constructor( string memory _name,
        string memory _symbol,
        string memory ipfsHash)
     ERC721(_name, _symbol)
     BaseAssignment(0x766483FE15F19112d9f6069d05e4eA4d24C4eFA5)
     Ownable(msg.sender) {
        // Set initial values for variables
        _nextTokenId = 1; // Start token IDs from 1
        _totalSupply = 0; // Initialize total supply to 0
        _mintPrice = 0.0001 ether; // Set mint price
        isSaleActive = true; // Set sale status to active
       _ipfsHash = ipfsHash; // Set IPFS hash
    }
     modifier onlyAuthorized() {
        require(msg.sender == owner() || isValidator(msg.sender), "Not authorized");
        _;
    }

    // mint a nft and send to _address
    function mint(address _address) public payable returns (uint256) {
        require(isSaleActive, "Sale is not active");
        require(msg.value >= _mintPrice, "Not enough ether sent");

       
        uint256 tokenId = _nextTokenId++;
        _safeMint(_address, tokenId);
        string memory tokenURI = getTokenURI(tokenId, _address);
        _setTokenURI(tokenId, tokenURI);
        _totalSupply++;
        _mintPrice = _mintPrice*=2; // Double the price for next mint

        return tokenId;
    }

    function burn(uint256 tokenId) public payable override {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner");
        require(msg.value >= _burnPrice, "Not enough ether sent");

        _burn(tokenId);
        _totalSupply--;
        _mintPrice = 0.0001 ether;
    }

    function getTotalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function getIPFSHash() public view override returns (string memory) {
        return _ipfsHash;
    }

    function getPrice() public view override returns (uint256) {
        return _mintPrice;
    }
    function pauseSale() external override {
        require(msg.sender == owner() || isValidator(msg.sender), "Not authorized");
        isSaleActive = false;
    }
    function activateSale() external override {
         require(msg.sender == owner() || isValidator(msg.sender), "Not authorized");
        isSaleActive = true;
    }

    function withdraw(uint256 amount) public override {
        require(msg.sender == owner() || isValidator(msg.sender), "Not authorized");
        require(amount <= address(this).balance, "Insufficient balance");
        require(amount > 0, "Amount must be greater than 0");

    // Verwende call zum Senden von Ether (empfohlen von Solidity by Example)
       (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Ether transfer failed");

       
    }

    function getSaleStatus() external view override returns (bool) {
        return isSaleActive;
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
            '",', 
            '"hash": "',
            _ipfsHash,
            '",', 
            '"by": "',
            // TODO: owner,
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