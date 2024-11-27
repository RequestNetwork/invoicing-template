import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAccount, useWalletClient } from "wagmi";
import { RequestNetwork } from '@requestnetwork/request-client.js';
import { LitProtocolProvider } from '@requestnetwork/lit-protocol-cipher';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { getTheGraphClient } from '@requestnetwork/payment-detection';

interface ContextType {
  requestNetwork: RequestNetwork | null;
  isWalletConnectedToCipherProvider: boolean;
  connectWalletToCipherProvider: (signer: unknown, walletAddress: string) => void;
  disconnectWalletFromCipherProvider: () => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected, chainId } = useAccount();
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork | null>(
    null
  );
  const [cipherProvider, setCipherProvider] =
    useState<LitProtocolProvider | undefined>();
  const [
    isWalletConnectedToCipherProvider,
    setIsWalletConnectedToCipherProvider,
  ] = useState(false);

  const initializeCipherProvider = () => {
    try {
      setCipherProvider(
        new LitProtocolProvider(
          process.env.NEXT_PUBLIC_LIT_PROTOCOL_CHAIN || 'ethereum',
          process.env.NEXT_PUBLIC_LIT_PROTOCOL_NETWORK || 'datil-dev',
          {
            baseURL: process.env.NEXT_PUBLIC_REQUEST_NODE || "https://gnosis.gateway.request.network/",
          },
        ),
      );
    } catch (error) {
      console.error('Failed to initialize Cipher Provider:', error);
      setCipherProvider(undefined);
    }
  };

  const initializeRequestNetwork = (walletClient: unknown) => {
    try {
      const web3SignatureProvider = new Web3SignatureProvider(walletClient);

      const requestNetwork = new RequestNetwork({
        cipherProvider,
        nodeConnectionConfig: {
          baseURL: process.env.NEXT_PUBLIC_REQUEST_NODE || "https://gnosis.gateway.request.network/",
        },
        signatureProvider: web3SignatureProvider,
        httpConfig: {
          getConfirmationMaxRetry: 360,
        },
        paymentOptions: {
          getSubgraphClient: (chain: string) => {
            // Ternary because cannot dynamically access environment variables in the browser
            const paymentsSubgraphUrl =
              chain === 'arbitrum-one'
                ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_ARBITRUM_ONE ||
                  'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-arbitrum-one/api'
                : chain === 'avalanche'
                  ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_AVALANCHE ||
                    'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-avalanche/api'
                  : chain === 'base'
                    ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_BASE ||
                      'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-base/api'
                    : chain === 'bsc'
                      ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_BSC ||
                        'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-bsc/api'
                      : chain === 'celo'
                        ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_CELO ||
                          'https://api.studio.thegraph.com/query/67444/request-payments-celo/version/latest'
                        : chain === 'core'
                          ? process.env
                              .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_CORE ||
                            'https://thegraph.coredao.org/subgraphs/name/requestnetwork/request-payments-core'
                          : chain === 'fantom'
                            ? process.env
                                .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_FANTOM ||
                              'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-fantom/api'
                            : chain === 'fuse'
                              ? process.env
                                  .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_FUSE ||
                                'https://api.studio.thegraph.com/query/67444/request-payments-fuse/version/latest'
                              : chain === 'mainnet'
                                ? process.env
                                    .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MAINNET ||
                                  'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-mainnet/api'
                                : chain === 'matic'
                                  ? process.env
                                      .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MATIC ||
                                    'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-matic/api'
                                  : chain === 'moonbeam'
                                    ? process.env
                                        .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MOONBEAM ||
                                      'https://api.studio.thegraph.com/query/67444/request-payments-moonbeam/version/latest'
                                    : chain === 'optimism'
                                      ? process.env
                                          .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_OPTIMISM ||
                                        'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-optimism/api'
                                      : chain === 'sepolia'
                                        ? process.env
                                            .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_SEPOLIA ||
                                          'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-sepolia/api'
                                        : chain === 'xdai'
                                          ? process.env
                                              .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_XDAI ||
                                            'https://api.studio.thegraph.com/query/67444/request-payments-xdai/version/latest'
                                          : chain === 'zksyncera'
                                            ? process.env
                                                .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_ZKSYNCERA ||
                                              'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-zksyncera/api'
                                            : undefined;
            if (!paymentsSubgraphUrl) {
              throw new Error(
                `Cannot get subgraph client for unknown chain: ${chain}`,
              );
            }
            return getTheGraphClient(chain, paymentsSubgraphUrl);
          },
        },
      });

      setRequestNetwork(requestNetwork);
    } catch (error) {
      console.error('Failed to initialize the Request Network:', error);
      setRequestNetwork(null);
    }
  };

  const connectWalletToCipherProvider = async (
    signer: any,
    walletAddress: string,
  ) => {
    if (cipherProvider) {
      await cipherProvider?.getSessionSignatures(signer, walletAddress);
      console.log('Connected to Cipher Provider');
      setIsWalletConnectedToCipherProvider(true);
    }
  };

  const disconnectWalletFromCipherProvider = () => {
    if (cipherProvider) {
      setRequestNetwork(null);
      cipherProvider?.disconnectWallet();
      setIsWalletConnectedToCipherProvider(false);
      setCipherProvider(undefined);
    }
  };  

  useEffect(() => {
    if (walletClient && isConnected && address && chainId) {
      initializeCipherProvider();
    }
  }, [walletClient, chainId, address, isConnected]);

  useEffect(() => {
    if (cipherProvider && isWalletConnectedToCipherProvider) {
      initializeRequestNetwork(walletClient);
    }
  }, [cipherProvider, isWalletConnectedToCipherProvider, walletClient]);

  return (
    <Context.Provider
      value={{
        requestNetwork, isWalletConnectedToCipherProvider, connectWalletToCipherProvider, disconnectWalletFromCipherProvider
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
