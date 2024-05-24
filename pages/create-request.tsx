import("@requestnetwork/create-request-form");
import { useEffect, useRef } from "react";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { CreateRequestFormProps } from "@/types";

export default function Home() {
  const formRef = useRef<CreateRequestFormProps>(null);
  const { wallet, requestNetwork } = useAppContext();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.config = config;

      if (wallet && requestNetwork) {
        formRef.current.signer = wallet.accounts[0].address;
        formRef.current.requestNetwork = requestNetwork;
      }
    }
  }, [wallet, requestNetwork]);

  return (
    <div className="container m-auto  w-[100%]">
      <create-request-form ref={formRef} />
    </div>
  );
}
