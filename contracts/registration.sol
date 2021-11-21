// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./creator.sol";

contract Registration {
    uint public maxCreatorCount;
    
    struct CreatorData {
        string metadata;
    }
    
    event CreatorAdded(string metadata);
    
    mapping (address => uint) public creatorAddrToId;
    mapping (uint => address) public creatorToContract;
    
    CreatorData[] allCreators;
    address assetAddr;
    address aLendingPoolAddr;
    
    constructor (address _assetAddr, address _aLendingPoolAddr) {
        assetAddr = _assetAddr;
        aLendingPoolAddr = _aLendingPoolAddr;
        
        allCreators.push(CreatorData("Paradise Biryani"));
    }
    
    function addCreator(string memory metadata) public {
        require(creatorAddrToId[msg.sender] == 0, "Creator already exists");

        CreatorData memory creator = CreatorData(metadata);
        allCreators.push(creator);
        maxCreatorCount++;
        
        creatorAddrToId[msg.sender] = maxCreatorCount;
        
        Creator creatorContract = new Creator(assetAddr, aLendingPoolAddr, msg.sender);
        creatorToContract[maxCreatorCount] = address(creatorContract);
        
        emit CreatorAdded(metadata);
    }
    
    function getCreator(uint creatorIdx) public view returns (string memory) {
        require(creatorIdx <= maxCreatorCount, "Creator does not exist");
        return allCreators[creatorIdx].metadata;
    }
    
    function getCreators(uint startCreatorIdx, uint numOfCreators) public view returns (string[] memory) {
        string[] memory creatorsToReturn = new string[](numOfCreators);
        
        for (uint i=0; i < numOfCreators; i++) {
            if ((startCreatorIdx + i) < allCreators.length) {
                creatorsToReturn[i] = allCreators[startCreatorIdx + i].metadata;
            }
        }
        
        return creatorsToReturn;
    }
    
    function editCreator(string memory metadata) public {
        uint creatorIdx = creatorAddrToId[msg.sender];
        
        require(creatorIdx > 0, "Invalid Creator Address");
        
        CreatorData storage creatorData = allCreators[creatorIdx];
        creatorData.metadata = metadata;
    }
    
}
