// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ILendingPool {
    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external returns (uint256);

    function repay(
        address asset,
        uint256 amount,
        uint256 rateMode,
        address onBehalfOf
    ) external returns (uint256);
}

contract Creator {
    ILendingPool lendingPool;
    IERC20 wethToken;
    address creatorAddr;
    
    uint public totalFanCount;
    uint public totalRawDepositCount;
    uint public totalDepositValue;

    mapping (address => uint) public fanAmount;
    
    // Mainnet WETH 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
    // Kovan WETH 0xd0A1E359811322d97991E03f863a0C30C2cF029C
    // Rinkeby WETH 0xc778417e063141139fce010982780140aa0cd5ab
    constructor(address assetAddr, address aLendingPoolAddr, address creatorAddrParam) {
        creatorAddr = creatorAddrParam;
        lendingPool = ILendingPool(aLendingPoolAddr);
        wethToken = IERC20(assetAddr);
    }
    
    modifier onlyCreator() {
        require(msg.sender == creatorAddr, "Not Creator");
        _;
    }
    
    modifier onlyFan() {
        require(fanAmount[msg.sender] > 0, "Not a fan!");
        _;
    }

    function _depositIntoAavePool (
        uint256 amount
    ) internal {
        if (amount > 0) {
            wethToken.approve(address(lendingPool), amount);
            lendingPool.deposit(address(wethToken), amount, address(this), 0);
        }

        // aTokensRec = IERC20(aToken).balanceOf(msg.sender) - initialBalance;
        // require(aTokensRec > minATokens, "High Slippage");
    }
    
    function currentContractBalance() public view returns (uint) {
        return wethToken.balanceOf(address(this));
    }
    
    function deposit(uint amount) public {
        require(amount > 0, "Invalid amount");
        
        bool success = wethToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer to contract failed");
        
        if (fanAmount[msg.sender] == 0) {
            totalFanCount += 1;
        }
        
        fanAmount[msg.sender] += amount;
        totalDepositValue += amount;
        totalRawDepositCount += 1;
        _depositIntoAavePool(amount);
    }
    
    function withdrawForCreator() public onlyCreator {
        uint withdrawnAmount = lendingPool.withdraw(address(wethToken), type(uint).max, address(this));
        uint interest = withdrawnAmount - totalDepositValue;
        
        wethToken.approve(msg.sender, interest);
        wethToken.transfer(msg.sender, interest);
        
        _depositIntoAavePool(currentContractBalance());
    }
    
    function withdrawForFan() public onlyFan {
        lendingPool.withdraw(address(wethToken), fanAmount[msg.sender], address(this));
        
        wethToken.approve(msg.sender, fanAmount[msg.sender]);
        wethToken.transfer(msg.sender, fanAmount[msg.sender]);
        
        _depositIntoAavePool(currentContractBalance());
        fanAmount[msg.sender] = 0;
        totalFanCount -= 1;
        totalDepositValue -= fanAmount[msg.sender];
    }
}
