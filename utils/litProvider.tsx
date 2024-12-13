import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LitProtocolCipherProvider } from '@requestnetwork/lit-protocol-cipher';
import { LIT_NETWORK } from '@lit-protocol/constants';
import { LIT_NETWORKS_KEYS } from '@lit-protocol/types';
import { useEffect } from 'react';

interface LitProviderProps {
  onProviderReady: (provider: any) => void;
}

export function LitProvider({ onProviderReady }: LitProviderProps) {
  const initializeLit = async () => {
    try {
      const litNodeClient = new LitNodeClient({
        litNetwork: process.env.NEXT_PUBLIC_LIT_PROTOCOL_NETWORK as LIT_NETWORKS_KEYS || LIT_NETWORK.Datil,
      });
      const litCipherProvider = new LitProtocolCipherProvider(
        litNodeClient,
        {
          baseURL:
            process.env.NEXT_PUBLIC_REQUEST_NODE ||
            'https://gnosis.gateway.request.network/',
          headers: {}
        },
      );
      litCipherProvider.initializeClient();
      onProviderReady(litCipherProvider);
    } catch (error) {
      console.error('Failed to initialize Cipher Provider:', error);
      onProviderReady(undefined);
    }
  };

  // Initialize on mount
  useEffect(() => {
    initializeLit();
  }, []);

  return null; // This component doesn't render anything
}