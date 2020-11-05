// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

// import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";
import './DBookToken.sol';

contract EbookStorage  {
    address owner;
    DBookToken public token;

    struct EBook {
        string title;
        string source;
        uint price;
    }

    // list of books issued by an author identified by thier address i.e. ebookSource[address][]
    mapping (address => mapping(uint => EBook)) public ebookSource;
    // count of books published by an author
    mapping (address => uint) public ebookCount;
    // mapping of ebook source to an author
    mapping (string => address) public authorOf;
    // mapping of title to source
    mapping (string => string) public sourceToTitle;
    // mapping of source to price
    mapping (string => uint) public sourceToPrice;



    // list of books owned by a client identified by thier address i.e. clientLib[address][]
    mapping (address => mapping(uint => EBook)) public clientLib;
    // list of books owned by a client identified by thier address i.e. clientLib[address][]
    mapping (address => uint) public clientLibCount;
    // bool for book owned by a client
    mapping (address => mapping(string => bool)) public isEbookOwned;


    // set up events
    event publishedBookEvent(address indexed _author, string _source, string _title, uint _price);
    event purchasedBookEvent(address indexed _client, address indexed _author, string _source, uint _amount);


    // set up modifiers
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



    function publishBook(string memory _source, string memory _title, uint _price) public isNotIssued(_source) {
        ebookSource[msg.sender][ebookCount[msg.sender]] = EBook(_title, _source, _price);
        authorOf[_source] = msg.sender;
        sourceToTitle[_source] = _title;
        sourceToPrice[_source] = _price;
        ebookCount[msg.sender]++;

        publishedBookEvent(msg.sender, _source, _title, _price);
    }



    function purchaseBook(address _author,  string calldata _source, uint _amount)  isNotPurchased(_source) external {
        require(authorOf[_source] == _author, 'Author has not issued that ebook');
        require(_amount == sourceToPrice[_source], 'Wrong amount of funds');
        require(token.transferFrom(msg.sender, _author, _amount), 'Transaction failed');

        string memory _title = sourceToTitle[_source];
        uint _price = sourceToPrice[_source];
        EBook memory ebook =  EBook(_title, _source, _price);
        
        // add the book to the client's library
        clientLib[msg.sender][clientLibCount[msg.sender]] = ebook;
        isEbookOwned[msg.sender][_source] = true;
        clientLibCount[msg.sender]++;
        
        purchasedBookEvent(msg.sender, _author, _source, _amount);
    }
}
