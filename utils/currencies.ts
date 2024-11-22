import { RequestLogicTypes, CurrencyTypes } from "@requestnetwork/types";

export const currencies: CurrencyTypes.CurrencyInput[] = [
  {
    symbol: "FAU",
    address: "0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C",
    network: "sepolia",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "ETH",
    network: "sepolia",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ETH,
  },
];
