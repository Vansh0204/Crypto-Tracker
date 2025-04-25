import React from 'react';

interface PercentageChangeProps {
  value: number;
}

// Simple SVG Icons for Up/Down
const UpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M7 14l5-5 5 5H7z" />
  </svg>
);

const DownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

const PercentageChange: React.FC<PercentageChangeProps> = ({ value }) => {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isZero = value === 0;

  const colorClass = isPositive ? 'positive' : isNegative ? 'negative' : 'zero';
  const IconComponent = isPositive ? UpIcon : isNegative ? DownIcon : null;

  return (
    <span className={`percentage percentage-value ${colorClass}`}>
      {IconComponent && (
        <span className="percentage-icon">
          <IconComponent />
        </span>
      )}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
};

export default PercentageChange; 