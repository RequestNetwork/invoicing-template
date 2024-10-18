import {
  bsc,
  celo,
  base,
  fuse,
  zksync,
  fantom,
  coreDao,
  polygon,
  mainnet,
  sepolia,
  arbitrum,
  moonbeam,
  optimism,
  avalanche,
  gnosis,
} from "wagmi/chains";
import { http } from "wagmi";
import {
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  safeWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const rainbowKitConfig = getDefaultConfig({
  appName: "Request Invoicing",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains: [
    bsc,
    celo,
    base,
    fuse,
    zksync,
    gnosis,
    fantom,
    coreDao,
    polygon,
    mainnet,
    sepolia,
    arbitrum,
    moonbeam,
    optimism,
    avalanche,
  ],
  transports: {
    [arbitrum.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_ARBITRUM_ONE ||
        "https://arbitrum.llamarpc.com"
    ),
    [avalanche.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_AVALANCHE || "https://avalanche.drpc.org"
    ),
    [base.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_BASE || "https://base.llamarpc.com"
    ),
    [bsc.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_BSC || "https://bsc.llamarpc.com"
    ),
    [celo.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_CELO || "https://forno.celo.org"
    ),
    [coreDao.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_CORE || "https://rpc.coredao.org"
    ),
    [fantom.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_FANTOM ||
        "https://endpoints.omniatech.io/v1/fantom/mainnet/public"
    ),
    [fuse.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_FUSE || "https://fuse.drpc.org"
    ),
    [mainnet.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_ETHEREUM || "https://eth.llamarpc.com"
    ),
    [polygon.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_POLYGON || "https://1rpc.io/matic"
    ),
    [moonbeam.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_MOONBEAM ||
        "https://moonbeam-rpc.publicnode.com"
    ),
    [optimism.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_OPTIMISM ||
        "https://optimism.llamarpc.com"
    ),
    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_SEPOLIA || "https://sepolia.drpc.org"
    ),
    [gnosis.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_XDAI || "https://gnosis.drpc.org"
    ),
    [zksync.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL_ZKSYNCERA ||
        "https://mainnet.era.zksync.io"
    ),
  },
  wallets: [
    {
      groupName: "Recommended",
      wallets: [injectedWallet, metaMaskWallet, walletConnectWallet],
    },
    {
      groupName: "Others",
      wallets: [safeWallet, coinbaseWallet, ledgerWallet, trustWallet],
    },
  ],
  ssr: true,
});
