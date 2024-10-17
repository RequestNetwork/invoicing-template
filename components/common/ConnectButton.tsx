import { ConnectButton as RainbowKitButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

import React from "react";

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
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={`flex items-center gap-[10px] disabled:cursor-not-allowed disabled:bg-grey disabled:text-dark-grey text-white rounded-[8px] hover:bg-dark-green transition-all text-[14px] tablet:px-[28px]  px-[14px] lg:px-[20px] text-14px lg:text-[16px] py-[8px] bg-green focus:outline-none`}
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    className="flex items-center text-white tablet:px-[28px]  px-[14px] lg:px-[20px] bg-green lg:text-[16px] py-[8px] rounded-[8px] gap-[10px]"
                    type="button"
                  >
                    {chain.hasIcon && (
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
                    )}
                    <span>{chain.name}</span>
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="text-[14px] text-white flex gap-[10px]"
                  >
                    <span className="tablet:px-[28px]  px-[14px] lg:px-[20px] bg-green lg:text-[16px] py-[8px] rounded-[8px]">
                      {account.displayName}
                    </span>
                    <span className="tablet:px-[28px]  px-[14px] lg:px-[20px] bg-green lg:text-[16px] py-[8px] rounded-[8px]">
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </span>
                  </button>
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
