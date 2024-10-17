import Head from "next/head";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { currencies } from "@/utils/currencies";
import { rainbowKitConfig as wagmiConfig } from "@/utils/connectWallet";
import InvoiceDashboard from "@requestnetwork/invoice-dashboard/react";

export default function InvoiceDashboardPage() {
  const { requestNetwork } = useAppContext();

  return (
    <>
      <Head>
        <title>Request Invoicing</title>
      </Head>
      <div className="container m-auto  w-[100%]">
        <InvoiceDashboard
          config={config}
          currencies={currencies}
          requestNetwork={requestNetwork}
          wagmiConfig={wagmiConfig}
        />
      </div>
    </>
  );
}
