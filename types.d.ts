import { IConfig } from "@requestnetwork/shared";
import { WalletState } from "@web3-onboard/core";
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
  wallet: WalletState;
  requestNetwork: RequestNetwork;
}

interface CreateInvoiceFormProps extends HTMLElement {
  config: IConfig;
  signer: string;
  requestNetwork: RequestNetwork;
}
