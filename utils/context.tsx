import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { initializeRequestNetwork } from "./initializeRN";
import type { RequestNetwork } from "@requestnetwork/request-client.js";
import { useAccount, useWalletClient } from "wagmi";

interface ContextType {
  requestNetwork: RequestNetwork | null;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected, chainId } = useAccount();
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork | null>(
    null
  );

  useEffect(() => {
    if (walletClient && isConnected && address && chainId) {
      initializeRequestNetwork(setRequestNetwork, walletClient);
    }
  }, [walletClient, chainId, address, isConnected]);

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
    throw new Error("useAppContext must be used within a Context Provider");
  }
  return context;
};
