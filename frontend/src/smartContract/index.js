import { ethers } from "ethers";

import ABI from "../artifacts/registration_abi.json";
import CREATOR_ABI from "../artifacts/creator_abi.json";
import ERC20_ABI from "../artifacts/ERC20_abi.json";
import { getLocalProvider } from "../utils/connectWallet";

const contractAddress = "0x51520bd17744e71b97ac8b47fd4155416e72b30f";

export class Contract {
  constructor(signerOrProvider) {
    this.contract = new ethers.Contract(contractAddress, ABI, signerOrProvider);
  }

  addCreator(hash) {
    return this.contract.addCreator(hash);
  }

  editCreator(hash) {
    return this.contract.editCreator(hash);
  }
}


export class CreatorContract {
  constructor(signerOrProvider, creatorContractAddress) {
    this.erc20 = new ethers.Contract('0xd0A1E359811322d97991E03f863a0C30C2cF029C', ERC20_ABI, signerOrProvider);
    this.contract = new ethers.Contract(creatorContractAddress, CREATOR_ABI, signerOrProvider);
    this.signerOrProvider= signerOrProvider;
    this.creatorContractAddress = creatorContractAddress
  }

  async getAddress() {
    return this.signerOrProvider.getAddress()
  }

  async approveWETH() {
    console.log("creatorContractAddress", this.creatorContractAddress);
    return this.erc20.approve(this.creatorContractAddress, 100000);
  }

  async depositFunds(eth) {
    console.log("creatorContractAddress", this.creatorContractAddress);
    return this.contract.deposit(eth)
  }

  async withdrawFundsCreator() {
    return await this.contract.withdrawForCreator();
  }

  async withdrawFundsFan() {
    return this.contract.withdrawForFan();
  }

  async creatorBalance() {
    // Return creator's balance
    return await this.contract.totalDepositValue();
  }

  async totalFanCount() {
    return await this.contract.functions.totalFanCount();
  }

  async fanDepositAmount() {
    const address = this.getAddress()
    return await this.contract.functions.fanAmount(address);
  }

  async totalNumberOfDeposits() {
    return await this.contract.functions.totalRawDepositCount();
  }

}

export class BurnerContract {
  constructor() {
    this.contract = new ethers.Contract(
      contractAddress,
      ABI,
      getLocalProvider()
    );
  }

  async getCreatorCount() {
    return await this.contract.functions.maxCreatorCount();
  }

  async getCreatorIdFromAddress(address) {
    return await this.contract.functions.creatorAddrToId(address);
  }

  async getContractFromId(id) {
    return this.contract.functions.creatorToContract(id);
  }

  async getCreatorFromId(id) {
    return await this.contract.functions.getCreator(id);
  }

  async getCreators(startIndex, count) {
    return await this.contract.functions.getCreators(startIndex, count);
  }
}

export const burnerContract = new BurnerContract();
