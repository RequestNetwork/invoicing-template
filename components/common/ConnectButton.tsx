import React from "react";
import Image from "next/image";
import Button from "./Button";
import { ConnectButton as RainbowKitButton } from "@rainbow-me/rainbowkit";

const ConnectButton = () => {
  return (
    <RainbowKitButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    outlined
                    text="Connect Wallet"
                    className="font-semibold"
                    onClick={openConnectModal}
                  />
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} text="Unsupported network" />
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    className="font-medium"
                    outlined
                    onClick={openChainModal}
                    text={chain.name as string}
                    element={{
                      content: chain.hasIcon && (
                        <div>
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              width={12}
                              height={12}
                              className="w-[20px] h-[20px]"
                            />
                          )}
                        </div>
                      ),
                      position: "left",
                    }}
                  />
                  <Button
                    outlined
                    className="font-medium"
                    text={account.displayName}
                    onClick={openAccountModal}
                  />
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowKitButton.Custom>
  );
};

export default ConnectButton;
