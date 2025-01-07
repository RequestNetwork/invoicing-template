import { RequestLogicTypes, CurrencyTypes } from "@requestnetwork/types";

export const createFormCurrencies: CurrencyTypes.CurrencyInput[] = [
  // FIAT
  {
    decimals: 2,
    symbol: "USD",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "EUR",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "AUD",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "BRL",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "CAD",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "CHF",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "CNY",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },

  {
    decimals: 2,
    symbol: "GBP",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "IDR",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "INR",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 0,
    symbol: "JPY",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 0,
    symbol: "KRW",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "NZD",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "SGD",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },
  {
    decimals: 2,
    symbol: "TRY",
    type: RequestLogicTypes.CURRENCY.ISO4217,
  },

  // Sepolia Testnet
  {
    symbol: "FAU",
    address: "0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C",
    network: "sepolia",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "fUSDT",
    address: "0xF046b3CA5ae2879c6bAcC4D42fAF363eE8379F78",
    network: "sepolia",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "fUSDC",
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    network: "sepolia",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "ETH",
    network: "sepolia",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ETH,
  },

  // Ethereum Mainnet
  {
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    network: "mainnet",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    network: "mainnet",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "REQ",
    address: "0x8f8221aFbB33998d8584A2B05749bA73c37a938a",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "ETH",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ETH,
  },

  // Polygon (Matic)
  {
    symbol: "USDC",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    network: "matic",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "USDT",
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    network: "matic",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "DAI",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    network: "matic",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "MATIC",
    network: "matic",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ETH,
  },

  // BSC
  {
    symbol: "DAI",
    address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    network: "bsc",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "BUSD",
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    network: "bsc",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },

  // xDai
  {
    symbol: "USDC",
    address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    network: "xdai",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },

  // Optimism
  {
    symbol: "USDC",
    address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    network: "optimism",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "USDT",
    address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
    network: "optimism",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "DAI",
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    network: "optimism",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "ETH",
    network: "optimism",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ETH,
  },

  // Base
  {
    symbol: "ETH",
    network: "base",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ETH,
  },
];

export const dashboardCurrencies: CurrencyTypes.CurrencyInput[] = [
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
