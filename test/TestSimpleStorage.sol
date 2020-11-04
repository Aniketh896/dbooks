pragma solidity >=0.4.21 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ComplexStorage.sol";

contract TestComplexStorage {
    function testItStoresAValue() public {
        ComplexStorage ComplexStorage = ComplexStorage(DeployedAddresses.ComplexStorage());

        ComplexStorage.set(89);

        uint expected = 89;

        Assert.equal(ComplexStorage.storedData(), expected, "It should store the value 89.");
    }
}