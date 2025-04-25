import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface SparklineProps {
  change7d: number;
  // Add assetId or another unique identifier for better randomness seeding if needed
  // assetId: number;
}

const NUM_POINTS = 20; // Increase number of data points
const BASE_VALUE = 15; // Mid-point for the graph range
const Y_RANGE = 10;   // Controls the min/max range around the base value

// Function to generate semi-random data for the sparkline
const generateSparklineData = (changePercent: number) => {
  const data = [];
  let currentValue = BASE_VALUE;
  // Slightly stronger trend influence based on 7d change
  const trend = (changePercent / 7) / NUM_POINTS; // Average daily trend applied per point

  for (let i = 0; i < NUM_POINTS; i++) {
    data.push({ value: currentValue });

    // Increased random fluctuation for more volatility
    const fluctuation = (Math.random() - 0.5) * 4; // Increased multiplier from 1.5 to 4

    currentValue += trend + fluctuation;
    // Keep value within a defined range
    currentValue = Math.max(BASE_VALUE - Y_RANGE, Math.min(BASE_VALUE + Y_RANGE, currentValue));
  }
  return data;
};

const Sparkline: React.FC<SparklineProps> = ({ change7d }) => {
  const strokeColor = change7d > 0 ? 'var(--positive-color)' : change7d < 0 ? 'var(--negative-color)' : 'var(--zero-color)';

  // Generate unique data for each instance using useMemo to prevent recalculation on every render
  const data = useMemo(() => generateSparklineData(change7d), [change7d]);

  return (
    // Ensure the container has a defined height and width, e.g., via parent TD or CSS
    <div style={{ width: '100px', height: '30px' }}>
      <ResponsiveContainer width="100%" height="100%">
        {/* Use generated data */}
        <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          {/* Optional: You can hide axes if you don't need them */}
          {/* <XAxis hide dataKey="name" /> */}
          {/* <YAxis hide domain={['dataMin', 'dataMax']} /> */}
          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={1.5}
            dot={false} // Hide dots on the line
            isAnimationActive={false} // Disable animation for performance if needed
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sparkline; 