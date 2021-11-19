import { ethers } from "ethers";

import ABI from "../artifacts/registration_abi.json";
import CREATOR_ABI from "../artifacts/creator_abi.json";
import ERC20_ABI from "../artifacts/ERC20_abi.json";
import { getLocalProvider } from "../utils/connectWallet";

const contractAddress = "0x8f0a090af441df605334b6f833c8d87cc9c40afc";

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
    return this.erc20.approve(this.creatorContractAddress, 1000);
  }

  async depositFunds(eth) {
    return this.contract.deposit(eth)
  }

  async withdrawFundsCreator() {
    return await this.contract.withdrawForCreator();
  }

  async withdrawFundsFan() {
    return this.contract.withdrawFundsFan();
  }

  async currentBalance() {
    const address =  await this.getAddress();
    return await this.contract.currentBalance(address);
  }

  async creatorBalance(creatorAddress) {
    return await this.contract.currentBalance(creatorAddress);
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
}

export const burnerContract = new BurnerContract();
