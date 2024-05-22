import { IConfig } from "@requestnetwork/shared";
import { WalletState } from "@web3-onboard/core";
import type { RequestNetwork } from "@requestnetwork/request-client.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "invoice-dashboard": InvoiceDashboardElement;
      "create-request-form": CreateRequestFormElement;
    }
  }
}

interface InvoiceDashboardElement {
  ref?: React.Ref<InvoiceDashboardProps>;
}

interface CreateRequestFormElement {
  ref?: React.Ref<CreateRequestFormProps>;
}

interface InvoiceDashboardProps extends HTMLElement {
  config: IConfig;
  wallet: WalletState;
  requestNetwork: RequestNetwork;
}

interface CreateRequestFormProps extends HTMLElement {
  config: IConfig;
  signer: string;
  requestNetwork: RequestNetwork;
}
