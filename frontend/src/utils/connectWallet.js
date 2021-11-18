import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import BurnerProvider from "burner-provider";
import { Web3Provider } from "@ethersproject/providers";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";

const INFURA_ID = "a9bed7baa25d43bbbfdad36243344d4e";

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "19b2294ebe0247a5a7beb92164520320", // nft-market infura id
      },
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        // Mikko's TESTNET api key
        key: "pk_test_391E26A3B43A3350",
      },
    },
    torus: {
      package: Torus,
    },
  },
});

export const logoutWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
};

export const getWalletProvider = async () => {
  const web3Modalprovider = await web3Modal.connect();
  const provider = new Web3Provider(web3Modalprovider);
  return provider;
};

export const getLocalProvider = () => {
  return new Web3Provider(
    new BurnerProvider("https://kovan.infura.io/v3/" + INFURA_ID)
  );
};
