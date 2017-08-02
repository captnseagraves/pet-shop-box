pragma solidity ^0.4.4;

contract Adoption {

address[16] public adopters;

  function adopt(unit petId) public returns (unit) {
    require(petId >= 0 && petId <= 15);

    adopters[petId] = msg.sender;

    return petId;
  }



}
