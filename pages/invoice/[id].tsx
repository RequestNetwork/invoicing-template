import Head from "next/head";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { config } from "@/utils/config";
import { Spinner } from "@/components/ui";
import { useAppContext } from "@/utils/context";
import { rainbowKitConfig as wagmiConfig } from "@/utils/wagmiConfig";

const SingleInvoiceComponent = dynamic(
  () => import("@requestnetwork/single-invoice/react"),
  { loading: () => <Spinner /> }
);

const SingleInvoice = ({ invoiceId }: { invoiceId: string }) => {
  const { requestNetwork, initializeRequestNetwork } = useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!requestNetwork) {
      initializeRequestNetwork();
    }
  }, [requestNetwork, initializeRequestNetwork]);

  if (!isClient || !requestNetwork) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>Request Invoicing - Single Invoice</title>
      </Head>
      <div className="container m-auto w-[100%]">
        <SingleInvoiceComponent
          config={config}
          requestId={invoiceId}
          requestNetwork={requestNetwork}
          wagmiConfig={wagmiConfig}
        />
      </div>
    </>
  );
};

export default SingleInvoice;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const path = req.url ?? "";
  const invoiceId = path.split("invoice/")[1] ?? null;

  return {
    props: {
      invoiceId,
    },
  };
};
