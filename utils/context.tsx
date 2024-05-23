import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useConnectWallet } from "@web3-onboard/react";
import type { RequestNetwork } from "@requestnetwork/request-client.js";
import { initializeRequestNetwork } from "./requestInit";

interface ContextType {
  requestNetwork: RequestNetwork | undefined;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork>();
  const [error, setError] = useState<unknown>("");

  const initRequestNetwork = async (provider: any) => {
    await initializeRequestNetwork(setRequestNetwork, provider);
  };

  useEffect(() => {
    if (wallet) {
      const { accounts, chains, provider } = wallet;
      initRequestNetwork(provider);
    }
  }, [wallet]);

  return (
    <Context.Provider
      value={{
        requestNetwork,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
