import("@requestnetwork/create-invoice-form");
import Head from "next/head";
import { useEffect, useRef } from "react";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { CreateInvoiceFormProps } from "@/types";
import { currencies } from "@/utils/currencies";

export default function CreateInvoice() {
  const formRef = useRef<CreateInvoiceFormProps>(null);
  const { wallet, requestNetwork } = useAppContext();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.config = config;

      if (wallet && requestNetwork) {
        formRef.current.signer = wallet.accounts[0].address;
        formRef.current.requestNetwork = requestNetwork;
        formRef.current.currencies = currencies;
      }
    }
  }, [wallet, requestNetwork]);

  return (
    <>
      <Head>
        <title>Request Invoicing - Create an Invoice</title>
      </Head>
      <div className="container m-auto  w-[100%]">
        <create-invoice-form ref={formRef} />
      </div>
    </>
  );
}
