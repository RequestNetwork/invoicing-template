import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { RequestNetwork } from '@requestnetwork/request-client.js';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { getTheGraphClient } from '@requestnetwork/payment-detection';
import { useEthersSigner } from './ethers'

interface ContextType {
  requestNetwork: RequestNetwork | null;
  isWalletConnectedToCipherProvider: boolean;
  connectWalletToCipherProvider: (
    signer: unknown,
    walletAddress: string,
  ) => void;
  disconnectWalletFromCipherProvider: () => void;
  isDecryptionEnabled: boolean;
  enableDecryption: (option: boolean) => void;
}

const getInitialState = () => {
  let status;
  if (typeof window !== "undefined") {
    status = localStorage?.getItem('isDecryptionEnabled');
  }
  try {
    return status ? JSON.parse(status) : false;
  } catch (error) {
    console.error('Failed to parse decryption status:', error);
    return false;
  }
};

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const { data: walletClient } = useWalletClient();
  const signer = useEthersSigner()
  const { address, isConnected, chainId } = useAccount();
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork | null>(
    null,
  );
  const [cipherProvider, setCipherProvider] = useState<any>();
  const [
    isWalletConnectedToCipherProvider,
    setIsWalletConnectedToCipherProvider,
  ] = useState(false);

  const [isDecryptionEnabled, setisDecryptionEnabled] =  useState(getInitialState);

  const instantiateCipherProvider = async () => {
    try {
      if (typeof window !== 'undefined') {
        // FIX: This is a temporary fix to import the LitProtocolProvider only in the browser
        // TODO: Find a better way to handle this in the Request Network SDK
        const { LitProtocolProvider } = await import('@requestnetwork/lit-protocol-cipher');
        const litCipherProvider = new LitProtocolProvider(
          process.env.NEXT_PUBLIC_LIT_PROTOCOL_CHAIN || 'ethereum',
          (process.env.NEXT_PUBLIC_LIT_PROTOCOL_NETWORK || 'datil') as 'datil',
          {
            baseURL:
              process.env.NEXT_PUBLIC_REQUEST_NODE ||
              'https://gnosis.gateway.request.network/',
            headers: {}
          },
        );
        litCipherProvider.initializeClient();
        setCipherProvider(litCipherProvider);
      }
    } catch (error) {
      console.error('Failed to initialize Cipher Provider:', error);
      setCipherProvider(undefined);
    }
  };

  const initializeRequestNetwork = (walletClient: unknown) => {
    try {
      if (walletClient) {
        const web3SignatureProvider = new Web3SignatureProvider(walletClient);

      const requestNetwork = new RequestNetwork({
        cipherProvider,
        nodeConnectionConfig: {
          baseURL:
            process.env.NEXT_PUBLIC_REQUEST_NODE ||
            'https://gnosis.gateway.request.network/',
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
      }
    } catch (error) {
      console.error('Failed to initialize the Request Network:', error);
      setRequestNetwork(null);
    }
  };

  const connectWalletToCipherProvider = async (
    signer: any,
    walletAddress: string,
  ) => {
    if (cipherProvider && signer && walletAddress) {
      try {
        await cipherProvider?.getSessionSignatures(signer, walletAddress);
        console.log('Connected to Cipher Provider');
        setIsWalletConnectedToCipherProvider(true);
      } catch (error) {
        console.error('Failed to connect to Cipher Provider:', error);
        setIsWalletConnectedToCipherProvider(false);
      }
    }
  };

  const disconnectWalletFromCipherProvider = () => {
    if (cipherProvider) {
      try {
        setRequestNetwork(null);
        cipherProvider?.disconnectWallet();
        setIsWalletConnectedToCipherProvider(false);
        setCipherProvider(undefined);
      } catch (error) {
        console.error('Failed to disconnect from Cipher Provider:', error);
        // Still reset state to ensure clean disconnection
        setIsWalletConnectedToCipherProvider(false);
        setCipherProvider(undefined);
        setRequestNetwork(null);
      }
    }
  };

const enableDecryption = async (option: boolean) => {
  if (cipherProvider && signer && address) {
    try {
      if(option) {
        await connectWalletToCipherProvider(signer, address as string);
      } 
      cipherProvider.enableDecryption(option);
      setisDecryptionEnabled(option);
    } catch (error) {
      console.error('Failed to enable/disable decryption:', error);
      setisDecryptionEnabled(false);
    }
  } else {
    setisDecryptionEnabled(false);
  }
};

  useEffect(() => {
    if (walletClient && isConnected && address && chainId) {
      instantiateCipherProvider();
    }
  }, [walletClient, chainId, address, isConnected]);

  useEffect(() => {
    if (cipherProvider) {
      initializeRequestNetwork(walletClient);
      enableDecryption(isDecryptionEnabled)
    }
  }, [cipherProvider, walletClient]);

  useEffect(() => {
    localStorage.setItem('isDecryptionEnabled', JSON.stringify(isDecryptionEnabled));
  }, [isDecryptionEnabled])

  return (
    <Context.Provider
      value={{
        requestNetwork,
        isWalletConnectedToCipherProvider,
        connectWalletToCipherProvider,
        disconnectWalletFromCipherProvider,
        isDecryptionEnabled,
        enableDecryption: enableDecryption,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a Context Provider');
  }
  return context;
};
