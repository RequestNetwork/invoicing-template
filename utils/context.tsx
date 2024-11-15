import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAccount, useWalletClient } from "wagmi";
import { RequestNetwork } from '@requestnetwork/request-client.js';
import { LitProtocolProvider } from '@requestnetwork/lit-protocol-cypher';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { getTheGraphClient } from '@requestnetwork/payment-detection';
import HttpDataAccess from '@requestnetwork/request-client.js/dist/http-data-access';
import { CypherProviderTypes } from '@requestnetwork/types';

interface ContextType {
  requestNetwork: RequestNetwork | null;
  isWalletConnectedToCypherProvider: boolean;
  connectWalletToCypherProvider: (signer: any, walletAddress: string) => void;
  disconnectWalletFromCypherProvider: () => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected, chainId } = useAccount();
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork | null>(
    null
  );
  const [cypherProvider, setCypherProvider] =
    useState<CypherProviderTypes.ICypherProvider | null>(null);
  const [
    isWalletConnectedToCypherProvider,
    setIsWalletConnectedToCypherProvider,
  ] = useState(false);

  const initializeCypherProvider = () => {
    setCypherProvider(
      new LitProtocolProvider(
        'ethereum',
        'datil-dev',
        new HttpDataAccess({
          nodeConnectionConfig: {
            baseURL: 'http://localhost:8080/',
          },
          httpConfig: {
            getConfirmationMaxRetry: 120,
          },
        }),
      ),
    );
  };

  const initializeRequestNetwork = (walletClient: any) => {
    try {
      const web3SignatureProvider = new Web3SignatureProvider(walletClient);

      const requestNetwork = new RequestNetwork({
        cypherProvider,
        nodeConnectionConfig: {
          baseURL: 'http://localhost:8080/',
        },
        signatureProvider: web3SignatureProvider,
        httpConfig: {
          getConfirmationMaxRetry: 120,
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

  const connectWalletToCypherProvider = async (
    signer: any,
    walletAddress: string,
  ) => {
    if (cypherProvider) {
      await cypherProvider.getSessionSignatures(signer, walletAddress);
      console.log('Connected to Cypher Provider');
      setIsWalletConnectedToCypherProvider(true);
    }
  };

  const disconnectWalletFromCypherProvider = () => {
    if (cypherProvider) {
      cypherProvider.disconnectWallet();
      setIsWalletConnectedToCypherProvider(false);
    }
    setCypherProvider(null);
    setRequestNetwork(null);
  };  

  useEffect(() => {
    if (walletClient && isConnected && address && chainId) {
      initializeCypherProvider();
    }
  }, [walletClient, chainId, address, isConnected]);

  useEffect(() => {
    if (cypherProvider && isWalletConnectedToCypherProvider) {
      initializeRequestNetwork(walletClient);
    }
  }, [cypherProvider, isWalletConnectedToCypherProvider]);

  return (
    <Context.Provider
      value={{
        requestNetwork, isWalletConnectedToCypherProvider, connectWalletToCypherProvider, disconnectWalletFromCypherProvider
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
