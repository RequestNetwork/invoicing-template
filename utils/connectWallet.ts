import safeModule from "@web3-onboard/gnosis";
import trustModule from "@web3-onboard/trust";
import ledgerModule from "@web3-onboard/ledger";
import trezorModule from "@web3-onboard/trezor";
import coinbaseModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";

const injected = injectedModule();

export const onboardConfig = {
  wallets: [
    injected,
    walletConnectModule({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      dappUrl: process.env.NEXT_PUBLIC_APP_URL,
    }),
    coinbaseModule(),
    ledgerModule({
      walletConnectVersion: 2,
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
    }),
    trezorModule({
      email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL!,
      appUrl: process.env.NEXT_PUBLIC_APP_URL!,
    }),
    safeModule(),
    trustModule(),
  ],
  chains: [
    {
      id: "0xa4b1",
      token: "ETH",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_ARBITRUM_ONE ||
        "https://arbitrum.llamarpc.com",
    },
    {
      id: "0xa86a",
      token: "AVAX",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_AVALANCHE ||
        "https://avalanche.drpc.org",
    },
    {
      id: "0x2105",
      token: "ETH",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_BASE || "https://base.llamarpc.com",
    },
    {
      id: "0x38",
      token: "BNB",
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_BSC || "https://bsc.llamarpc.com",
    },
    {
      id: "0xa4ec",
      token: "CELO",
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_CELO || "https://forno.celo.org",
    },
    {
      id: "0x45c",
      token: "CORE",
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_CORE || "https://rpc.coredao.org",
    },
    {
      id: "0xfa",
      token: "FTM",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_FANTOM ||
        "https://endpoints.omniatech.io/v1/fantom/mainnet/public",
    },
    {
      id: "0x7a",
      token: "FUSE",
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_FUSE || "https://fuse.drpc.org",
    },
    {
      id: "0x1",
      token: "ETH",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_ETHEREUM || "https://eth.llamarpc.com",
    },
    {
      id: "0x89",
      token: "MATIC",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_POLYGON || "https://1rpc.io/matic",
    },
    {
      id: "0x504",
      token: "GLMR",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_MOONBEAM ||
        "https://moonbeam-rpc.publicnode.com",
    },
    {
      id: "0xa",
      token: "ETH",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_OPTIMISM ||
        "https://optimism.llamarpc.com",
    },
    {
      id: "0xaa36a7",
      token: "ETH",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_SEPOLIA || "https://sepolia.drpc.org",
    },
    {
      id: "0x64",
      token: "XDAI",
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_XDAI || "https://gnosis.drpc.org",
    },
    {
      id: "0x144",
      token: "ETH",
      rpcUrl:
        process.env.NEXT_PUBLIC_RPC_URL_ZKSYNCERA ||
        "https://mainnet.era.zksync.io",
    },
  ],
  appMetadata: {
    name: "Request Invoicing",
    icon: "assets/logo.svg",
    description: "Request Network Invoicing Template",
  },
};
