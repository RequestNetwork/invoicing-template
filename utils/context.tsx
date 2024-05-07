import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Account, toHex } from "viem";
import { onboard } from "./connectWallet";
import type { RequestNetwork } from "@requestnetwork/request-client.js";
import { initializeRequestNetwork } from "./requestInit";

interface ContextType {
  account: string;
  disconnect: () => void;
  connectWallet: () => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork>();

  const [account, setAccount] = useState("");
  const [error, setError] = useState<unknown>("");
  const [chainId, setChainId] = useState("");
  const [network, setNetwork] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      setIsLoading(true);
      const { accounts, chains, provider } = wallets[0];
      setAccount(accounts[0].address);
      setChainId(chains[0].id);
      await onboard.setChain({
        chainId: "0xaa36a7",
      });

      await initializeRequestNetwork(
        accounts[0].address,
        setRequestNetwork,
        provider
      );

      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const disconnect = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (!primaryWallet) return;
    await onboard.disconnectWallet({ label: primaryWallet.label });
    refreshState();
  };

  const refreshState = () => {
    setAccount("");
    setChainId("");
    setRequestNetwork(undefined);
  };

  return (
    <Context.Provider
      value={{
        account,
        disconnect,
        connectWallet,
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
