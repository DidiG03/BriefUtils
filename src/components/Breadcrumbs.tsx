'use client';

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        aria-label="Home"
      >
        <HomeIcon className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRightIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          
          {index === items.length - 1 ? (
            // Current page - not a link
            <span className="text-gray-900 dark:text-white font-medium">
              {item.label}
            </span>
          ) : (
            // Intermediate breadcrumb - clickable link
            <Link 
              href={item.href}
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

// Utility function to generate breadcrumbs from pathname
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  let currentPath = '';
  
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    
    // Convert path segments to readable labels
    let label = path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Special cases for common paths
    switch (path) {
      case 'png-to-jpeg':
        label = 'PNG to JPEG Converter';
        break;
      case 'heic-to-jpeg':
        label = 'HEIC to JPEG Converter';
        break;
      case 'word-counter':
        label = 'Word Counter';
        break;
      case 'json-formatter':
        label = 'JSON Formatter';
        break;
      case 'qr-generator':
        label = 'QR Code Generator';
        break;
      case 'age-calculator':
        label = 'Age Calculator';
        break;
      case 'image-to-webp':
        label = 'Image to WebP Converter';
        break;
      case 'image-to-ico':
        label = 'Image to ICO Converter';
        break;
      case 'svg-to-png':
        label = 'SVG to PNG Converter';
        break;
      default:
        // Keep the formatted label
        break;
    }
    
    breadcrumbs.push({
      label,
      href: currentPath
    });
  });
  
  return breadcrumbs;
}