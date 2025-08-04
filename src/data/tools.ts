export interface Tool {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  path: string;
  icon: string;
  category: string;
  keywords: string[];
  featured: boolean;
}

export const tools: Tool[] = [
  {
    id: 'png-to-jpeg',
    name: 'PNG to JPEG Converter',
    description: 'Convert PNG images to JPEG format quickly and easily. Reduce file size while maintaining quality.',
    shortDescription: 'Convert PNG images to JPEG format',
    path: '/png-to-jpeg',
    icon: '🖼️',
    category: 'Image',
    keywords: ['png', 'jpeg', 'jpg', 'convert', 'image', 'format', 'compress'],
    featured: true,
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text. Perfect for writers and students.',
    shortDescription: 'Count words and characters in text',
    path: '/word-counter',
    icon: '📝',
    category: 'Text',
    keywords: ['word', 'count', 'character', 'text', 'writing', 'analyze'],
    featured: true,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data. Perfect for developers working with APIs and data structures.',
    shortDescription: 'Format and validate JSON data',
    path: '/json-formatter',
    icon: '📋',
    category: 'Developer',
    keywords: ['json', 'format', 'validate', 'beautify', 'minify', 'developer'],
    featured: true,
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, phone numbers, and more. Customize size and download instantly.',
    shortDescription: 'Generate QR codes for text and URLs',
    path: '/qr-generator',
    icon: '📱',
    category: 'Utility',
    keywords: ['qr', 'code', 'generate', 'url', 'text', 'scan'],
    featured: true,
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes. Find out how old you are.',
    shortDescription: 'Calculate age from birth date',
    path: '/age-calculator',
    icon: '🎂',
    category: 'Calculator',
    keywords: ['age', 'calculator', 'birthday', 'date', 'years', 'months'],
    featured: true,
  },
];

export const categories = [
  { id: 'all', name: 'All Tools', count: tools.length },
  { id: 'image', name: 'Image', count: tools.filter(tool => tool.category === 'Image').length },
  { id: 'text', name: 'Text', count: tools.filter(tool => tool.category === 'Text').length },
  { id: 'developer', name: 'Developer', count: tools.filter(tool => tool.category === 'Developer').length },
  { id: 'utility', name: 'Utility', count: tools.filter(tool => tool.category === 'Utility').length },
  { id: 'calculator', name: 'Calculator', count: tools.filter(tool => tool.category === 'Calculator').length },
];

export const getFeaturedTools = () => tools.filter(tool => tool.featured);

export const getToolsByCategory = (category: string) => {
  if (category === 'all') return tools;
  return tools.filter(tool => tool.category.toLowerCase() === category.toLowerCase());
};

export const getToolById = (id: string) => tools.find(tool => tool.id === id);

export const searchTools = (query: string) => {
  const searchTerm = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
  );
};