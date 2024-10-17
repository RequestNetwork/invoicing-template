import Head from "next/head";
import CreateInvoiceForm from "@requestnetwork/create-invoice-form/react";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { currencies } from "@/utils/currencies";
import { rainbowKitConfig as wagmiConfig } from "@/utils/connectWallet";

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
          currencies={currencies}
          wagmiConfig={wagmiConfig}
          requestNetwork={requestNetwork}
        />
      </div>
    </>
  );
}
