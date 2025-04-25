import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CryptoAsset } from '../features/crypto/types';
import PercentageChange from './PercentageChange';
import Sparkline from './Sparkline';

interface CryptoRowProps {
  asset: CryptoAsset;
  index: number;
}

// Helper function for compact number formatting
const formatCompactNumber = (number: number): string => {
  // Handle potential NaN or non-number inputs gracefully
  if (typeof number !== 'number' || isNaN(number)) {
    return '-'; // Or 'N/A', or return an empty string
  }
  try {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(number);
  } catch (error) {
    console.error("Error formatting number:", number, error);
    return String(number); // Fallback to simple string conversion
  }
};

const CryptoRow: React.FC<CryptoRowProps> = ({ asset, index }) => {
  // Basic logo URL generation (replace with actual URLs or imports if needed)
  const logoUrl = `https://s2.coinmarketcap.com/static/img/coins/64x64/${asset.id}.png`;

  // State for price flash effect
  const [flashClass, setFlashClass] = useState<string>('');
  const prevPriceRef = useRef<number | undefined>(asset.price);

  // Effect to detect price change and trigger flash
  useEffect(() => {
    const currentPrice = asset.price;
    const previousPrice = prevPriceRef.current;

    if (previousPrice !== undefined && currentPrice !== previousPrice) {
      const directionClass = currentPrice > previousPrice ? 'flash-up' : 'flash-down';
      setFlashClass(directionClass);

      // Remove the class after the animation duration (must match CSS animation duration)
      const timer = setTimeout(() => {
        setFlashClass('');
      }, 700); // 700ms matches CSS animation

      // Cleanup timeout on component unmount or if price changes again before timeout finishes
      return () => clearTimeout(timer);
    }

    // Update previous price ref *after* comparison
    prevPriceRef.current = currentPrice;

  }, [asset.price]); // Dependency array ensures this runs only when price changes

  // Animation variants (optional, for more control)
  const rowVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.tr
      layout
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={rowVariants}
      transition={{ duration: 0.3 }}
    >
      {/* Rank - will be hidden in card view via CSS */}
      <td data-label="#">
        <span className="rank">{index + 1}</span>
      </td>
      {/* Name */}
      <td data-label="Name">
        <img src={logoUrl} alt={`${asset.name} logo`} className="crypto-logo" />
        <span className="crypto-name">{asset.name}</span>
        <span className="crypto-symbol">{asset.symbol}</span>
      </td>
      {/* Price - Add flashClass and base class */}
      <td data-label="Price" className={`price-cell ${flashClass}`}>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      {/* 1h % */}
      <td data-label="1h %"><PercentageChange value={asset.change1h} /></td>
      {/* 24h % */}
      <td data-label="24h %"><PercentageChange value={asset.change24h} /></td>
      {/* 7d % */}
      <td data-label="7d %"><PercentageChange value={asset.change7d} /></td>
      {/* Market Cap - Formatted */}
      <td data-label="Market Cap">${formatCompactNumber(asset.marketCap)}</td>
      {/* Volume (24h) - Formatted */}
      <td data-label="Volume (24h)">${formatCompactNumber(asset.volume24h)}</td>
      {/* Circulating Supply - Formatted */}
      <td data-label="Circulating Supply">{formatCompactNumber(asset.circulatingSupply)} {asset.symbol}</td>
      {/* Last 7 Days Chart */}
      <td data-label="Last 7 Days"><Sparkline change7d={asset.change7d} /></td>
    </motion.tr>
  );
};

export default CryptoRow; 