import Navbar from "@/components/common/Navbar";
import "@/styles/globals.css";
import { Provider } from "@/utils/context";
import { GoogleTagManager } from "@next/third-parties/google";

import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";

import { onboardConfig } from "../utils/connectWallet";
import wagmi from "@web3-onboard/wagmi";
import { init, Web3OnboardProvider } from "@web3-onboard/react";

const montserrat = Montserrat({ subsets: ["latin"] });

const wen3Onboard = init({
  wagmi,
  connect: {
    autoConnectAllPreviousWallet: true,
  },
  ...onboardConfig,
});

export default function App({ Component, pageProps }: AppProps) {
  const [activeWallet] = wen3Onboard.state.get().wallets;
  const { wagmiConnector } = activeWallet;

  console.log(wagmiConnector);

  return (
    <div className={`${montserrat.className}`}>
      <Web3OnboardProvider web3Onboard={wen3Onboard}>
        <Provider>
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </Web3OnboardProvider>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </div>
  );
}
