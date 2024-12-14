import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LitProtocolCipherProvider } from '@requestnetwork/lit-protocol-cipher';
import { LIT_NETWORK } from '@lit-protocol/constants';
import { LIT_NETWORKS_KEYS } from '@lit-protocol/types';
import { useEffect, useRef } from 'react';

interface LitProviderProps {
  onProviderReady: (provider: LitProtocolCipherProvider | undefined) => void;
}

export function LitProvider({ onProviderReady }: LitProviderProps) {
  const litProviderRef = useRef<LitProtocolCipherProvider | null>(null);

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
      litProviderRef.current = litCipherProvider;
      onProviderReady(litCipherProvider);
    } catch (error) {
      console.error('Failed to initialize Cipher Provider:', error);
      onProviderReady(undefined);
    }
  };

  // Initialize on mount
  useEffect(() => {
    initializeLit();
    return () => {
      litProviderRef.current?.disconnectClient?.();
    };
  }, []);

  return null; // This component doesn't render anything
}