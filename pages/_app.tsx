import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components";
import { Provider } from "@/utils/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}
