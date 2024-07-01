import { Types } from "@requestnetwork/request-client.js";

export const currencies = [
  {
    symbol: "FAU",
    address: "0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C",
    network: "sepolia",
    decimals: 18,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "USDC",
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    network: "sepolia",
    decimals: 6,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "USDC",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    network: "mainnet",
    decimals: 6,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    network: "mainnet",
    decimals: 6,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    network: "mainnet",
    decimals: 18,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "USDC",
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    network: "matic",
    decimals: 6,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "DAI",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    network: "matic",
    decimals: 18,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "USDCE",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    network: "matic",
    decimals: 6,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
];
