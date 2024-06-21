import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import type { AppProps } from "next/app";
import Navbar from "@/components/common/Navbar";
import { Provider } from "@/utils/context";
import { init, Web3OnboardProvider } from "@web3-onboard/react";
import { onboardConfig } from "../utils/connectWallet";

const montserrat = Montserrat({ subsets: ["latin"] });

const wen3Onboard = init({
  connect: {
    autoConnectAllPreviousWallet: true,
  },
  ...onboardConfig,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.className}`}>
      <Web3OnboardProvider web3Onboard={wen3Onboard}>
        <Provider>
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </Web3OnboardProvider>
    </div>
  );
}
