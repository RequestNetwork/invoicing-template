import { useEffect, useRef } from 'react';
import type { LitProtocolCipherProvider } from '@requestnetwork/lit-protocol-cipher';
import type { LIT_NETWORKS_KEYS } from '@lit-protocol/types';

interface LitProviderProps {
  onProviderReady: (provider: LitProtocolCipherProvider | undefined) => void;
}

export function LitProvider({ onProviderReady }: LitProviderProps) {
  const litProviderRef = useRef<LitProtocolCipherProvider | null>(null);

  const initializeLit = async () => {
    try {
      // Dynamic imports to reduce initial bundle size
      const [
        { LitNodeClient },
        { LitProtocolCipherProvider },
        { LIT_NETWORK }
      ] = await Promise.all([
        import('@lit-protocol/lit-node-client'),
        import('@requestnetwork/lit-protocol-cipher'),
        import('@lit-protocol/constants')
      ]);

      const litNodeClient = new LitNodeClient({
        litNetwork: (process.env.NEXT_PUBLIC_LIT_PROTOCOL_NETWORK as LIT_NETWORKS_KEYS) || LIT_NETWORK.Datil,
        debug: false,
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

      await litCipherProvider.initializeClient();
      litProviderRef.current = litCipherProvider;
      onProviderReady(litCipherProvider);
    } catch (error) {
      console.error('Failed to initialize Cipher Provider:', error);
      onProviderReady(undefined);
    }
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (mounted) {
        await initializeLit();
      }
    };

    init();

    return () => {
      mounted = false;
      if (litProviderRef.current?.disconnectClient) {
        litProviderRef.current.disconnectClient();
        litProviderRef.current = null;
      }
    };
  }, []);

  return null;
}