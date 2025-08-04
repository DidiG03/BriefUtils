'use client';

import AdSense from './AdSense';

interface AdBannerProps {
  slot: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function AdBanner({ slot, className = '', size = 'medium' }: AdBannerProps) {
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          style: { display: 'block', width: '320px', height: '100px' },
          format: 'horizontal' as const,
        };
      case 'large':
        return {
          style: { display: 'block', width: '970px', height: '250px' },
          format: 'horizontal' as const,
        };
      default: // medium
        return {
          style: { display: 'block', width: '728px', height: '90px' },
          format: 'horizontal' as const,
        };
    }
  };

  const { style, format } = getSizeConfig();

  return (
    <div className={`ad-banner flex justify-center my-6 ${className}`}>
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-w-full overflow-hidden">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">
          Advertisement
        </div>
        <AdSense
          adSlot={slot}
          style={style}
          adFormat={format}
          className="mx-auto"
        />
      </div>
    </div>
  );
}