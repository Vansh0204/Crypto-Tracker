import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import { selectAllAssets, selectCryptoStatus } from '../features/crypto/cryptoSlice';
import { CryptoAsset } from '../features/crypto/types'; // Import CryptoAsset type
import CryptoRow from './CryptoRow';

// Define sortable keys
type SortableKey = keyof Pick<CryptoAsset, 'name' | 'price' | 'change1h' | 'change24h' | 'change7d' | 'marketCap' | 'volume24h' | 'circulatingSupply'>;

const CryptoTable: React.FC = () => {
  const assets = useSelector(selectAllAssets);
  const status = useSelector(selectCryptoStatus);

  const [sortKey, setSortKey] = useState<SortableKey | null>(null); // Initially unsorted
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  const filteredAndSortedAssets = useMemo(() => {
    // Start with the original assets from Redux
    let processedAssets = [...assets];

    // Apply filtering
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      processedAssets = processedAssets.filter(asset =>
        asset.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        asset.symbol.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Apply sorting
    if (sortKey) {
      processedAssets.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        // Handle potential null/undefined if sorting by optional keys (like maxSupply if added)
        // Basic comparison for numbers and strings
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        // Add more specific handling if needed for mixed types or nulls
        return 0;
      });
    }

    return processedAssets;
  }, [assets, sortKey, sortDirection, searchTerm]); // Add searchTerm to dependencies

  const handleSort = (key: SortableKey) => {
    if (sortKey === key) {
      // If same key, reverse direction
      setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If new key, set key and default to ascending
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Updated helper to render sort indicator
  const renderSortIndicator = (key: SortableKey) => {
    if (sortKey === key) {
      // Active sort indicator
      return <span className="sort-indicator active">{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>;
    }
    // Default indicator for all other sortable columns
    return <span className="sort-indicator default"> ↕</span>;
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data.</div>;
  }

  // Define which headers are sortable
  const sortableHeaders: { key: SortableKey; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'change1h', label: '1h %' },
    { key: 'change24h', label: '24h %' },
    { key: 'change7d', label: '7d %' },
    { key: 'marketCap', label: 'Market Cap' },
    { key: 'volume24h', label: 'Volume (24h)' },
    { key: 'circulatingSupply', label: 'Circulating Supply' },
    // Add maxSupply here if it becomes sortable
  ];

  return (
    <div className="crypto-table-container">
      {/* Search Input */}
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            {/* Render Sortable Headers */}
            {sortableHeaders.map(header => (
              <th key={header.key} onClick={() => handleSort(header.key)} className="sortable-header">
                {header.label}
                {renderSortIndicator(header.key)}
              </th>
            ))}
            {/* Non-sortable header */}
            <th>Last 7 Days</th>
          </tr>
        </thead>
        {/* Wrap tbody with motion.tbody */}
        <motion.tbody layout>
          {/* Wrap map with AnimatePresence */}
          <AnimatePresence initial={false}>
            {/* Map over filteredAndSortedAssets */}
            {filteredAndSortedAssets.map((asset, index) => (
              <CryptoRow key={asset.id} asset={asset} index={index} />
            ))}
          </AnimatePresence>
        </motion.tbody>
      </table>
    </div>
  );
};

export default CryptoTable; 