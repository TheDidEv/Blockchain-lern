import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import faucerContract from "./ethereum/faucet";

// Metamsk api docs - https://docs.metamask.io/wallet/reference/provider-api/#request

function App() {
  const [walletAddres, setWalletAddress] = useState("");
  const [signer, setSigner] = useState();
  const [fcContract, setFcContract] = useState();
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState("");
  const [transactionData, setTransaktionData] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletList();
  });

  // Function for connect metamask wallet
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        // get provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // get account
        const accounts = await provider.send("eth_requestAccounts", []);

        // get signer
        setSigner(provider.getSigner());

        // local contract instalce
        setFcContract(faucerContract(provider));

        // Metamask is installed
        // const accounts = await window.ethereum.request({
        //   method: "eth_requestAccounts",
        // });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Metamask not install
      console.log("Install metamask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        // get provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // get account
        const accounts = await provider.send("eth_requestAccounts", []);

        // const accounts = await window.ethereum.request({
        //   method: "eth_accounts",
        // });
        if (accounts.length > 0) {
          setSigner(provider.getSigner());
          setFcContract(faucerContract(provider));
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to metamask using the Connect button");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Install metamask");
    }
  };

  // will be change wallet after change account on metamask, on id area.
  const addWalletList = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });
    } else {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress("");
      });
    }
  };

  const getOCThandler = async () => {
    setWithdrawError("");
    setWithdrawSuccess("");
    try {
      const fcContractWithSigner = fcContract.connect(signer);
      const resp = await fcContractWithSigner.requestTokens();
      console.log(resp);
      setWithdrawSuccess("Operation succeeded - enjoy your tokens!");
      setTransaktionData(resp.hash);
    } catch (error) {
      console.error(error.message);
      setWithdrawError(error.message);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">Ocean Token (OCT)</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={connectWallet}
              >
                <span className="is-link has-text-weight-bold">
                  {walletAddres && walletAddres.length > 0
                    ? `Connected ${walletAddres.substring(
                        0,
                        6
                      )}...${walletAddres.substring(38)}`
                    : "Connect wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">Faucet</h1>
            <p>Fast and reliable. 50 OCT/day.</p>

            <div className="mt-5">
              {withdrawError && (
                <div className="withdraw-error">{withdrawError}</div>
              )}
              {withdrawSuccess && (
                <div className="withdraw-error">{withdrawSuccess}</div>
              )}{" "}
            </div>

            <div className="box address-box">
              <div className="columns">
                <div className="column is-four-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter your wallet address (0x...)"
                    defaultValue={walletAddres}
                  />
                </div>
                <div className="column">
                  <button
                    className="button is-link is-medium"
                    onClick={getOCThandler}
                    disabled={walletAddres ? false : true}
                  >
                    GET TOKENS
                  </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  {transactionData
                    ? `Transaction hash: ${transactionData}`
                    : "--"}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
