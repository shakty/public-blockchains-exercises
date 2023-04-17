// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IERC20 {
    // ERC-20 Methods:
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    // ERC-20 Events:
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract MyERC20 is IERC20 {
    // Implementation of interface...

    address public owner;
    string public name;
    string public symbol;
    uint8 public constant decimals = 18;

    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;

    uint256 private _totalSupply;

    constructor(string memory _name, string memory _symbol, uint256 _total) {
        name = _name;
        symbol = _symbol;
        _totalSupply = _total;
        owner = msg.sender;
        balances[msg.sender] = _totalSupply;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address tokenOwner) public view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public returns (bool) {
        // Check balance.
        require(numTokens <= balances[msg.sender], "Not enough tokens");
        
        // Transfer.
        balances[msg.sender] -= numTokens;
        balances[receiver] += numTokens;
        
        // Emit.
        emit Transfer(msg.sender, receiver, numTokens);

        return true;
    }

    function approve(address delegate, uint256 numTokens) public returns (bool) {
        allowed[msg.sender][delegate] = numTokens;

        // Emit event.
        emit Approval(msg.sender, delegate, numTokens);
        
        return true;
    }

    function allowance(address from, address delegate) public view returns (uint) {
        return allowed[from][delegate];
    }

    function transferFrom(address from, address to, uint256 numTokens) public returns (bool) {
        require(numTokens <= balances[from], "Not enough tokens in from balance");
        require(numTokens <= allowed[from][msg.sender], "Allowance not enough");

        balances[from] -= numTokens;
        allowed[from][msg.sender] -= numTokens;
        balances[to] += numTokens;

        // Emit event.
        emit Transfer(from, to, numTokens);
        
        return true;
    }

    function mint (address recipient, uint256 numTokens) external {
        require(msg.sender == owner, "Only owner can mint");
        require(recipient != address(0), "Mint to the zero address");

        _totalSupply += numTokens;

        balances[recipient] += numTokens;
        
        emit Transfer(address(0), recipient, numTokens);
    }
}