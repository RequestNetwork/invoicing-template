import { useEffect, useRef } from "react";
import { config } from "@/utils/config";
import { currencies } from "@/utils/currencies";
import { useAccount, usePublicClient } from "wagmi"; // Use usePublicClient instead of useProvider
import { adaptWalletProvider } from "@/utils/adaptWalletProvider"; // Import the adapter
import { useAppContext } from "@/utils/context";

export default function InvoiceDashboard() {
  const dashboardRef = useRef(null);
  const { address } = useAccount(); // Get the connected account
  const publicClient = usePublicClient(); // Get the connected provider
  const { requestNetwork } = useAppContext();

  // Adapt the provider using the adapter function
  const walletProvider = adaptWalletProvider(publicClient);

  useEffect(() => {
    if (dashboardRef.current) {
      dashboardRef.current.config = config;

      dashboardRef.current.wallet = walletProvider;
      dashboardRef.current.requestNetwork = requestNetwork;
      dashboardRef.current.currencies = currencies;
    }
  }, [walletProvider]);

  return (
    <div className="container m-auto w-[100%]">
      <invoice-dashboard ref={dashboardRef} />
    </div>
  );
}
