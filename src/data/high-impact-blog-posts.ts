export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  category: string;
}

export const seoOptimizedBlogPosts: BlogPost[] = [
  {
    id: "complete-image-format-guide-2025",
    title: "Complete Guide to Image File Formats in 2025: PNG vs JPEG vs WebP vs HEIC",
    slug: "complete-image-format-guide-2025",
    description: "Comprehensive guide to choosing the right image format for your needs. Compare PNG, JPEG, WebP, HEIC, and more with real-world examples and conversion tools.",
    content: "# Complete Guide to Image File Formats in 2025\n\nChoosing the right image format is crucial for website performance and user experience. This guide covers PNG, JPEG, WebP, HEIC and when to use each format.\n\n## PNG Format\nBest for graphics with transparency, logos, and screenshots. Lossless compression maintains perfect quality but creates larger files.\n\n## JPEG Format\nIdeal for photographs and complex images. Lossy compression reduces file size significantly while maintaining good visual quality.\n\n## WebP Format\nModern format offering 25-35% smaller files than JPEG with better quality. Supported by most modern browsers.\n\n## HEIC Format\nApple's format offering 50% smaller files than JPEG but limited to Apple ecosystem.\n\n## Conversion Tools\nUse our conversion tools to optimize your images for any platform or use case.",
    publishedAt: "2025-01-15",
    updatedAt: "2025-01-15",
    author: "BriefUtils Team",
    tags: ["image formats", "web performance", "SEO", "conversion", "optimization"],
    readingTime: 8,
    featured: true,
    category: "Image Tools"
  },
  {
    id: "json-for-beginners-complete-guide",
    title: "JSON for Beginners: Complete Guide to Understanding and Using JSON in 2025",
    slug: "json-for-beginners-complete-guide",
    description: "Learn JSON from scratch with practical examples, common use cases, and best practices. Perfect for developers, API users, and data enthusiasts.",
    content: "# JSON for Beginners: Complete Guide\n\nJSON (JavaScript Object Notation) is the universal language of data exchange on the web. This guide covers everything you need to know.\n\n## What is JSON?\nJSON is a lightweight, text-based data format that's easy for humans to read and write, and easy for machines to parse.\n\n## Basic Syntax\n- Data is in name/value pairs\n- Data is separated by commas\n- Curly braces hold objects\n- Square brackets hold arrays\n- Strings use double quotes\n\n## Common Use Cases\n- API responses and requests\n- Configuration files\n- Data storage\n- Web application communication\n\n## Best Practices\n- Use consistent naming conventions\n- Validate your JSON syntax\n- Keep structure as flat as possible\n- Use meaningful property names",
    publishedAt: "2025-01-15",
    updatedAt: "2025-01-15",
    author: "BriefUtils Team",
    tags: ["JSON", "programming", "data", "API", "web development"],
    readingTime: 12,
    featured: true,
    category: "Developer Tools"
  },
  {
    id: "content-writing-word-count-guide",
    title: "The Content Writer's Guide to Word Count: How Many Words for Maximum Impact",
    slug: "content-writing-word-count-guide",
    description: "Master content length for every platform. Learn optimal word counts for blog posts, social media, academic writing, and more with practical examples.",
    content: "# The Content Writer's Guide to Word Count\n\nWord count isn't just a number—it's a strategic decision that affects readability, SEO rankings, and user engagement.\n\n## Why Word Count Matters\n- SEO and search rankings\n- User experience and attention spans\n- Platform optimization\n- Content value perception\n\n## Optimal Lengths by Content Type\n\n### Blog Posts\n- Short-form: 300-800 words\n- Medium-form: 800-1,500 words\n- Long-form: 1,500-3,000+ words\n\n### Social Media\n- Twitter: 71-100 characters for best engagement\n- LinkedIn: 150-300 words for posts\n- Facebook: 40-80 characters optimal\n- Instagram: 125-150 characters\n\n### Email Marketing\n- Subject lines: 30-50 characters\n- Email body: 150-300 words\n\n### Academic Writing\n- Research papers: 3,000-10,000 words\n- Essays: 500-1,500 words\n\n## Best Practices\n- Quality over quantity\n- Match length to purpose\n- Know your audience\n- Test different lengths\n- Focus on value delivery",
    publishedAt: "2025-01-15",
    updatedAt: "2025-01-15",
    author: "BriefUtils Team",
    tags: ["content writing", "word count", "SEO", "social media", "copywriting"],
    readingTime: 15,
    featured: true,
    category: "Text Tools"
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return seoOptimizedBlogPosts.find(post => post.slug === slug);
};

export const getFeaturedBlogPosts = (): BlogPost[] => {
  return seoOptimizedBlogPosts.filter(post => post.featured);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return seoOptimizedBlogPosts.filter(post => post.category === category);
};