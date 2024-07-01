import("@requestnetwork/invoice-dashboard");
import Head from "next/head";
import { useEffect, useRef } from "react";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { InvoiceDashboardProps } from "@/types";
import { useConnectWallet } from "@web3-onboard/react";
import { currencies } from "@/utils/currencies";

export default function InvoiceDashboard() {
  const [{ wallet }] = useConnectWallet();
  const { requestNetwork } = useAppContext();
  const dashboardRef = useRef<InvoiceDashboardProps>(null);

  useEffect(() => {
    if (dashboardRef.current) {
      dashboardRef.current.config = config;

      if (wallet && requestNetwork) {
        dashboardRef.current.wallet = wallet;
        dashboardRef.current.requestNetwork = requestNetwork;
        dashboardRef.current.currencies = currencies;
      }
    }
  }, [wallet, requestNetwork]);

  return (
    <>
      <Head>
        <title>Request Invoicing</title>
      </Head>
      <div className="container m-auto  w-[100%]">
        <invoice-dashboard ref={dashboardRef} />
      </div>
    </>
  );
}
