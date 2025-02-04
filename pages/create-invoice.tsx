import Head from "next/head";
import dynamic from "next/dynamic";
import { rainbowKitConfig as wagmiConfig } from "@/utils/wagmiConfig";
import { config } from "@/utils/config";
import { Spinner } from "@/components/ui";
import { useAppContext } from "@/utils/context";

const CreateInvoiceForm = dynamic(
  () => import("@requestnetwork/create-invoice-form/react"),
  { ssr: false, loading: () => <Spinner /> }
);

export default function CreateInvoice() {
  const { requestNetwork } = useAppContext();

  return (
    <>
      <Head>
        <title>Request Invoicing - Create an Invoice</title>
      </Head>
      <div className="container m-auto  w-[100%]">
        <CreateInvoiceForm
          config={config}
          wagmiConfig={wagmiConfig}
          requestNetwork={requestNetwork}
          singleInvoicePath="/"
        />
      </div>
    </>
  );
}
