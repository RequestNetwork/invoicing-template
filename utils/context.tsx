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
import { WalletState } from "@web3-onboard/core";

interface ContextType {
  wallet: WalletState | undefined;
  requestNetwork: RequestNetwork | undefined;
  disconnect: () => void;
  connectWallet: () => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork>();
  const [wallet, setWallet] = useState();
  const [error, setError] = useState<unknown>("");
  const [chainId, setChainId] = useState("");
  const [network, setNetwork] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      setIsLoading(true);
      const { accounts, chains, provider } = wallets[0];
      setWallet(wallets[0] as any);
      setChainId(chains[0].id);

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
    setWallet(undefined);
    setChainId("");
    setRequestNetwork(undefined);
  };

  return (
    <Context.Provider
      value={{
        wallet,
        disconnect,
        connectWallet,
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
