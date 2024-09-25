import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import Navbar from "@/components/common/Navbar";
import "@/styles/globals.css";
import { Provider } from "@/utils/context";
import { GoogleTagManager } from "@next/third-parties/google";

import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const queryClient = new QueryClient(); // Create a QueryClient instance

// Get chains and default provider using getDefaultConfig
const config = getDefaultConfig({
  appName: "Request Invoicing",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [mainnet, polygon, optimism, arbitrum],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.className}`}>
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Provider>
              <Navbar />
              <Component {...pageProps} />
            </Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiConfig>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </div>
  );
}
