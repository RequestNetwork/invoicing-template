import Navbar from "@/components/common/Navbar";
import "@/styles/globals.css";
import { Provider } from "@/utils/context";
import { GoogleTagManager } from "@next/third-parties/google";
import { init, Web3OnboardProvider } from "@web3-onboard/react";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { onboardConfig } from "../utils/connectWallet";
import VersionDisplay from "@/components/common/VersionBadge";

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
          <VersionDisplay
            githubRelease={
              "https://github.com/RequestNetwork/invoicing-template/releases"
            }
          />
        </Provider>
      </Web3OnboardProvider>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </div>
  );
}
