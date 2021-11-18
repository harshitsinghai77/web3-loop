import { ethers } from "ethers";

import ABI from "../artifacts/registration_abi.json";
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
