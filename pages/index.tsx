import Head from "next/head";
import dynamic from "next/dynamic";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { rainbowKitConfig as wagmiConfig } from "@/utils/wagmiConfig";
import { Spinner } from "@/components/ui";

const InvoiceDashboard = dynamic(
  () => import("@requestnetwork/invoice-dashboard/react"),
  { ssr: false, loading: () => <Spinner /> }
);

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
          requestNetwork={requestNetwork}
          wagmiConfig={wagmiConfig}
          singleInvoicePath="/invoice"
        />
      </div>
    </>
  );
}
