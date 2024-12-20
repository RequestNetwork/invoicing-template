import { RequestLogicTypes, CurrencyTypes } from "@requestnetwork/types";

export const createFormCurrencies: CurrencyTypes.CurrencyInput[] = [
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
    address: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
    network: "sepolia",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "fUSDC",
    address: "0x8267cF9254734C6Eb452a7bb9AAF97B392258b21",
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
    symbol: "AXS",
    address: "0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "AUDIO",
    address: "0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "RAI",
    address: "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "SYLO",
    address: "0xf293d23BF2CDc05411Ca0edDD588eb1977e8dcd4",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "LDO",
    address: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "UST",
    address: "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "MNT",
    address: "0x3c3a81e81dc49A522A592e7622A7E711c06bf354",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "MIR",
    address: "0x09a3EcAFa817268f77BE1283176B946C4ff2E608",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "INJ",
    address: "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "OCEAN",
    address: "0x967da4048cD07aB37855c090aAF366e4ce1b9F48",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "ANKR",
    address: "0x8290333ceF9e6D528dD5618Fb97a76f268f3EDD4",
    network: "mainnet",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "RLY",
    address: "0xf1f955016EcbCd7321c7266BccFB96c68ea5E49b",
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

  // Avalanche
  {
    symbol: "USDC",
    address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    network: "avalanche",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "USDT",
    address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    network: "avalanche",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },
  {
    symbol: "AVAX",
    network: "avalanche",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ETH,
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

  // Moonbeam
  {
    symbol: "USDC",
    address: "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b", // multichain
    network: "moonbeam",
    decimals: 6,
    type: RequestLogicTypes.CURRENCY.ERC20,
  },

  // Fantom
  {
    symbol: "FTM",
    network: "fantom",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ETH,
  },

  // Mantle
  {
    symbol: "MNT",
    network: "mantle",
    decimals: 18,
    type: RequestLogicTypes.CURRENCY.ETH,
  },

  // zkSync Era
  {
    symbol: "ETH",
    network: "zksyncera",
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
