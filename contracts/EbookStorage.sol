// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

// import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";
import './DBookToken.sol';

contract EbookStorage  {
    address owner;
    DBookToken public token;



    // list of books issued by an author identified by thier address i.e. ebookSource[address][]
    mapping (address => mapping(uint => string)) public ebookSource;
    // count of books published by an author
    mapping (address => uint) public ebookCount;
    // mapping of ebook source to an author
    mapping (string => address) public authorOf;



    // list of books owned by a client identified by thier address i.e. clientLib[address][]
    mapping (address => mapping(uint => string)) public clientLib;
    // list of books owned by a client identified by thier address i.e. clientLib[address][]
    mapping (address => uint) public clientLibCount;
    // bool for book owned by a client
    mapping (address => mapping(string => bool)) public isEbookOwned;



    modifier isNotIssued(string memory _source) {
        require(authorOf[_source] == address(0), 'Book is already issued');
        _;
    }



    modifier isNotPurchased(string memory _source) {
        require(!isEbookOwned[msg.sender][_source], 'You already own the ebook');
        _;
    }



    constructor(DBookToken _token) public {
        owner = msg.sender;
        token = _token;
    }



    function publishBook(string memory _source) public isNotIssued(_source) {
        ebookSource[msg.sender][ebookCount[msg.sender]] = _source;
        authorOf[_source] = msg.sender;
        ebookCount[msg.sender]++;
    }



    function purchaseBook(address _author,  string memory _source, uint _amount) public external isNotPurchased(_source) {
        require(token.transferFrom(msg.sender, _author, _amount), 'Transaction failed');

        // add the book to the client's library
        clientLib[msg.sender][clientLibCount[msg.sender]] = _source;
        clientLibCount[msg.sender]++;
    }
}
