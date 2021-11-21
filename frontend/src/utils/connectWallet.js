import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import BurnerProvider from "burner-provider";
import { Web3Provider } from "@ethersproject/providers";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "460f40a260564ac4a4f4b3fffb032dad",
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
  setTimeout(() => {
    window.location.reload();
  }, 1);
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
