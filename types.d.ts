import { IConfig } from "@/utils/types";
import { Config as WagmiConfig } from "wagmi";
import type { RequestNetwork } from "@requestnetwork/request-client.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "invoice-dashboard": InvoiceDashboardElement;
      "create-invoice-form": CreateInvoiceFormElement;
    }
  }
}

interface InvoiceDashboardElement {
  ref?: React.Ref<InvoiceDashboardProps>;
}

interface CreateInvoiceFormElement {
  ref?: React.Ref<CreateInvoiceFormProps>;
}

interface InvoiceDashboardProps extends HTMLElement {
  config: IConfig;
  wagmiConfig: WagmiConfig;
  requestNetwork: RequestNetwork;
  currencies: any;
}

interface CreateInvoiceFormProps extends HTMLElement {
  config: IConfig;
  wagmiConfig: WagmiConfig;
  requestNetwork: RequestNetwork;
  currencies: any;
}
