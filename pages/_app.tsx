import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { Navbar } from "../components";
import { Provider } from "@/utils/context";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className}`}>
      <Provider>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
