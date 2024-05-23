import Onboard from "@web3-onboard/core";
import safeModule from "@web3-onboard/gnosis";
import trustModule from "@web3-onboard/trust";
import ledgerModule from "@web3-onboard/ledger";
import trezorModule from "@web3-onboard/trezor";
import coinbaseModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";

const injected = injectedModule();

export const onboard = Onboard({
  wallets: [
    injected,
    walletConnectModule({
      projectId: "your-project-id",
    }),
    coinbaseModule(),
    ledgerModule({
      walletConnectVersion: 2,
      projectId: "your-project-id",
    }),
    trezorModule({
      email: "test@test.com",
      appUrl: "https://www.example.com",
    }),
    safeModule(),
    trustModule(),
  ],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      rpcUrl: "https://eth.llamarpc.com",
    },
    {
      id: "0x11155111",
      token: "ETH",
      rpcUrl: "https://sepolia.drpc.org",
    },
    {
      id: "0x4",
      token: "ETH",
    },
  ],
  appMetadata: {
    name: "Request Network Demo",
    icon: "assets/logo.svg",
    description: "Demonstration of Web3 Onboard integration",
  },
});
