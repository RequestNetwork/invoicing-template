/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "../common/Button";
import { useAppContext } from "@/utils/context";
import { truncateAddress } from "@/utils/walletUtils";
import { useConnectWallet } from "@web3-onboard/react";

const Navbar = () => {
  const [{ wallet }, connect] = useConnectWallet();
  const router = useRouter();
  const links = [
    {
      name: "My dashboard",
      href: "/",
    },
    {
      name: "Create a Request",
      href: "/create-request",
    },
  ];

  return (
    <nav className="h-full flex items-center p-[20px] gap-[60px] bg-white shadow-small mb-[80px]">
      <Link href="/">
        <img
          src="assets/logo.svg"
          alt="Request Network Logo"
          className="w-[120px]"
        />
      </Link>
      <ul className="h-full flex gap-[60px]">
        {links.map((link, index) => (
          <li className={`h-full relative text-black`} key={index}>
            <Link href={link.href}>{link.name}</Link>
            <div
              className={`${
                router.pathname === link.href &&
                "h-[4px] bg-light-green w-full absolute bottom-[-28px]"
              }`}
            ></div>
          </li>
        ))}
      </ul>
      <Button
        className="ml-auto"
        text={
          wallet
            ? truncateAddress(wallet.accounts[0].address)
            : "Connect Wallet"
        }
        onClick={() => {
          connect();
        }}
      />
    </nav>
  );
};

export default Navbar;
