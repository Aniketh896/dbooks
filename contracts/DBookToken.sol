// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DBookToken is ERC20 {
    constructor() ERC20("DBookToken", "DBKT") public {}

    function faucet(address _to, uint _amount) external {
        _mint(_to, _amount);
    }
}
