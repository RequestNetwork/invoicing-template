import("@requestnetwork/invoice-dashboard");
import { useEffect, useRef } from "react";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { InvoiceDashboardProps } from "@/types";

export default function Home() {
  const dashboardRef = useRef<InvoiceDashboardProps>(null);
  const { wallet, requestNetwork } = useAppContext();

  useEffect(() => {
    if (dashboardRef.current) {
      dashboardRef.current.config = config;

      if (wallet && requestNetwork) {
        dashboardRef.current.wallet = wallet;
        dashboardRef.current.requestNetwork = requestNetwork;
      }
    }
  }, [wallet, requestNetwork]);

  return (
    <div>
      <invoice-dashboard ref={dashboardRef} />
    </div>
  );
}
