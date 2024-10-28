import { http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { createConfig } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { injected } from "@wagmi/connectors";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";

export const mockRainbowKitConfig = getDefaultConfig({
  appName: "Request Invoicing Test",
  projectId: "test-project-id",
  chains: [mainnet],
  transports: {
    [mainnet.id]: http("https://eth.llamarpc.com"),
  },
  wallets: [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  ssr: true,
});

export const mockPublicClient = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http("https://eth.llamarpc.com"),
  },
});
