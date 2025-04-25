export interface CryptoAsset {
    id: number; // CoinMarketCap ID for logo fetching
    name: string;
    symbol: string;
    price: number;
    change1h: number;
    change24h: number;
    change7d: number;
    marketCap: number;
    volume24h: number;
    circulatingSupply: number;
    maxSupply?: number | null; // Optional: Max supply might not exist
  } 