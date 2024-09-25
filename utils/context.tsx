import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { initializeRequestNetwork } from "./initializeRN";
import type { RequestNetwork } from "@requestnetwork/request-client.js";

// Import RainbowKit hooks
import { useAccount, useConnect, useDisconnect, usePublicClient } from "wagmi";

interface ContextType {
  rainbowKitWallet: string | null;
  requestNetwork: RequestNetwork | null;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const { address: rainbowKitAddress } = useAccount(); // Get connected wallet address
  const rainbowKitProvider = usePublicClient(); // Get the public provider (RainbowKit provider)
  const { disconnect } = useDisconnect(); // Handle disconnect logic
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork | null>(
    null
  );

  const rainbowKitWallet = rainbowKitAddress || null;

  useEffect(() => {
    // Initialize Request Network if RainbowKit wallet is connected
    if (rainbowKitWallet && rainbowKitProvider) {
      initializeRequestNetwork(setRequestNetwork, rainbowKitProvider);
    }
  }, [rainbowKitWallet, rainbowKitProvider]);

  return (
    <Context.Provider
      value={{
        rainbowKitWallet,
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
