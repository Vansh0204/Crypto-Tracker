import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CryptoAsset } from './types';

// Helper function to generate random percentage change
const getRandomChange = (base: number): number => {
    // Simulate smaller, more frequent changes around 0
    const change = (Math.random() - 0.5) * 0.5; // Small random change (-0.25% to +0.25%)
    return parseFloat((base + change).toFixed(2));
};

// Helper function to simulate price/volume change
const simulateChange = (currentValue: number, factor: number = 0.01): number => {
    const change = (Math.random() - 0.5) * factor * currentValue;
    return Math.max(0, currentValue + change); // Ensure value doesn't go below 0
};

interface CryptoState {
  assets: CryptoAsset[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CryptoState = {
  assets: [
    // Sample data based loosely on the provided image
    {
      id: 1, name: 'Bitcoin', symbol: 'BTC', price: 93759.48, change1h: 0.43, change24h: 0.93, change7d: 11.11,
      marketCap: 1861618902186, volume24h: 43874950947, circulatingSupply: 19850000, maxSupply: 21000000
    },
    {
      id: 1027, name: 'Ethereum', symbol: 'ETH', price: 1802.46, change1h: 0.60, change24h: 3.21, change7d: 13.68,
      marketCap: 217581279327, volume24h: 23547469307, circulatingSupply: 120710000, maxSupply: null
    },
    {
      id: 825, name: 'Tether', symbol: 'USDT', price: 1.00, change1h: -0.00, change24h: -0.00, change7d: 0.04,
      marketCap: 145320022085, volume24h: 92288882007, circulatingSupply: 145270000000, maxSupply: null
    },
    {
        id: 52, name: 'XRP', symbol: 'XRP', price: 2.22, change1h: 0.46, change24h: 0.54, change7d: 6.18,
        marketCap: 130073814966, volume24h: 5131481491, circulatingSupply: 58390000000, maxSupply: 100000000000
      },
      {
        id: 1839, name: 'BNB', symbol: 'BNB', price: 606.65, change1h: 0.09, change24h: -1.20, change7d: 3.73,
        marketCap: 85471956947, volume24h: 1874281784, circulatingSupply: 140890000, maxSupply: 200000000
      },
      // Add Solana or other assets if needed
      {
        id: 5426, name: 'Solana', symbol: 'SOL', price: 151.51, change1h: 0.53, change24h: 1.26, change7d: 14.74,
        marketCap: 78381958631, volume24h: 4881674486, circulatingSupply: 517310000, maxSupply: null
      },
      {
        id: 2010, name: 'Cardano', symbol: 'ADA', price: 0.45, change1h: -0.15, change24h: 1.80, change7d: 5.55,
        marketCap: 16000000000, volume24h: 350000000, circulatingSupply: 35000000000, maxSupply: 45000000000
      },
      {
        id: 74, name: 'Dogecoin', symbol: 'DOGE', price: 0.15, change1h: 0.80, change24h: 2.50, change7d: 8.10,
        marketCap: 21000000000, volume24h: 800000000, circulatingSupply: 140000000000, maxSupply: null
      },
      {
        id: 6636, name: 'Polkadot', symbol: 'DOT', price: 7.50, change1h: 0.25, change24h: -0.50, change7d: 2.10,
        marketCap: 10000000000, volume24h: 200000000, circulatingSupply: 1300000000, maxSupply: null
      },
      {
        id: 5805, name: 'Avalanche', symbol: 'AVAX', price: 35.00, change1h: 1.10, change24h: 3.00, change7d: 9.50,
        marketCap: 13000000000, volume24h: 400000000, circulatingSupply: 370000000, maxSupply: 720000000
      },
      {
        id: 5994, name: 'Shiba Inu', symbol: 'SHIB', price: 0.000025, change1h: -0.50, change24h: 1.50, change7d: 4.20,
        marketCap: 14000000000, volume24h: 500000000, circulatingSupply: 589000000000000, maxSupply: null // Approx 589 Trillion
      },
      {
        id: 1958, name: 'TRON', symbol: 'TRX', price: 0.12, change1h: 0.05, change24h: 0.90, change7d: 1.80,
        marketCap: 10500000000, volume24h: 300000000, circulatingSupply: 87000000000, maxSupply: null
      },
  ],
  status: 'idle',
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssets: (state) => {
      state.assets = state.assets.map(asset => {
        // Simulate small random fluctuations for price, volume, and percentages
        const newPrice = simulateChange(asset.price, 0.005); // Smaller price change factor
        const newVolume = simulateChange(asset.volume24h, 0.02);
        const newChange1h = getRandomChange(asset.change1h);
        const newChange24h = getRandomChange(asset.change24h);
        // Keep 7d change less volatile or update it less frequently if needed
        // const newChange7d = getRandomChange(asset.change7d);

        return {
          ...asset,
          price: newPrice,
          volume24h: newVolume,
          change1h: newChange1h,
          change24h: newChange24h,
          // change7d: newChange7d, // Uncomment to simulate 7d change
        };
      });
    },
    // Add other reducers if needed (e.g., setAssets, setLoading)
  },
});

export const { updateAssets } = cryptoSlice.actions;

// Selectors
export const selectAllAssets = (state: RootState) => state.crypto.assets;
export const selectCryptoStatus = (state: RootState) => state.crypto.status;

export default cryptoSlice.reducer; 