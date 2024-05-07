import { RequestNetwork } from "@requestnetwork/request-client.js";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";

export const initializeRequestNetwork = async (
  signer: string,
  setter: any,
  walletClient: any
): Promise<void> => {
  try {
    const web3SignatureProvider = new Web3SignatureProvider(walletClient);

    const requestNetwork = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL: "https://sepolia.gateway.request.network/",
      },
      signatureProvider: web3SignatureProvider,
    });

    setter(requestNetwork);
    console.log("Request Network initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize the Request Network:", error);
    setter(null);
  }
};
