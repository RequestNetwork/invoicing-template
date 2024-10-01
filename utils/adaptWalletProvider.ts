// utils/adaptWalletProvider.ts
export function adaptWalletProvider(wallet: any) {
  // Handle Web3Onboard wallets or any wallet with a provider
  if (wallet?.provider) {
    return wallet.provider;
  }

  // Handle RainbowKit (wagmi) wallets
  if (wallet?.connector?.options?.shimDisconnect) {
    return wallet.provider;
  }

  // If none of the known provider keys exist, return null
  return null;
}
