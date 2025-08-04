'use client';

import AdSense from './AdSense';

interface AdSquareProps {
  slot: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function AdSquare({ slot, className = '', size = 'medium' }: AdSquareProps) {
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { width: '200px', height: '200px' };
      case 'large':
        return { width: '336px', height: '280px' };
      default: // medium
        return { width: '300px', height: '250px' };
    }
  };

  const { width, height } = getSizeConfig();

  return (
    <div className={`ad-square flex justify-center my-4 ${className}`}>
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">
          Advertisement
        </div>
        <AdSense
          adSlot={slot}
          style={{ display: 'block', width, height }}
          adFormat="rectangle"
          className="mx-auto"
        />
      </div>
    </div>
  );
}