import { WagmiProvider } from "wagmi";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { GoogleTagManager } from "@next/third-parties/google";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Navbar, VersionDisplay } from "@/components/common";
import { Provider } from "@/utils/context";
import { rainbowKitConfig } from "@/utils/wagmiConfig";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <div className={`${montserrat.className}`}>
      <WagmiProvider config={rainbowKitConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Provider>
              <Navbar />
              <Component {...pageProps} />
              <VersionDisplay
                githubRelease={
                  "https://github.com/RequestNetwork/invoicing-template/releases"
                }
              />
            </Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </div>
  );
}
