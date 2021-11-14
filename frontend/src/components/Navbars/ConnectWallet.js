import { React, useContext } from "react";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import { Button } from "reactstrap";

import { store } from "../../store/store";
import { SET_WEB3_PROVIDER } from "../../store/types";

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

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

const ConnectWallet = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const existingProvider = globalState.state.web3Provider;
  const onConnectWallet = async () => {
    const provider = await web3Modal.connect();
    if (provider) {
      dispatch({
        type: SET_WEB3_PROVIDER,
        value: provider,
      });
    }
  };

  const onLogoutWallet = async () => {
    await logoutOfWeb3Modal();
  };
  console.log("existingProvider", existingProvider);
  return (
    <>
      {existingProvider ? (
        <Button
          onClick={onLogoutWallet}
          className="btn-neutral btn-icon"
          color="default"
        >
          <span className="nav-link-inner--text ml-1">Disconnect Bitch</span>
        </Button>
      ) : (
        <Button
          onClick={onConnectWallet}
          className="btn-neutral btn-icon"
          color="default"
        >
          <span className="nav-link-inner--text ml-1">Connect Bitch</span>
        </Button>
      )}
    </>
  );
};

export default ConnectWallet;
