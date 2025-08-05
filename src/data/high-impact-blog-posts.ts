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
    content: `# Complete Guide to Image File Formats in 2025: PNG vs JPEG vs WebP vs HEIC

In the digital age, choosing the right image format can make or break your website's performance, user experience, and storage efficiency. With new formats emerging and browsers evolving, it's crucial to understand which format serves your specific needs best.

## Why Image Format Choice Matters

The image format you choose affects:
- **Loading speed**: Critical for SEO and user experience
- **File size**: Important for bandwidth and storage costs
- **Quality**: Visual appeal and professional presentation
- **Compatibility**: Ensuring your images work everywhere
- **Features**: Transparency, animation, compression options

## PNG Format: When Transparency Matters

### Best Uses for PNG
- Images with transparency
- Graphics and logos
- Screenshots with text
- Images requiring lossless compression

### PNG Advantages
- Lossless compression maintains perfect quality
- Full transparency support
- Great for graphics with sharp edges
- Universal browser support

### PNG Disadvantages
- Larger file sizes than JPEG
- Not ideal for photographs
- No animation support

**When to convert PNG to JPEG**: Use our [PNG to JPEG converter](/png-to-jpeg) when you need smaller file sizes for photographs or don't need transparency.

## JPEG Format: The Photography Standard

### Best Uses for JPEG
- Photographs and images with many colors
- Web images where file size matters
- Social media uploads
- Email attachments

### JPEG Advantages
- Excellent compression for photographs
- Small file sizes
- Universal compatibility
- Adjustable quality levels

### JPEG Disadvantages
- Lossy compression reduces quality
- No transparency support
- Not ideal for graphics with sharp edges

## WebP Format: The Modern Choice

### Best Uses for WebP
- Modern websites prioritizing performance
- E-commerce product images
- Blog post featured images
- Progressive web apps

### WebP Advantages
- 25-35% smaller than JPEG
- Supports transparency like PNG
- Excellent compression algorithms
- Both lossy and lossless options

### WebP Disadvantages
- Limited support in older browsers
- Not supported by all image editing software
- Learning curve for optimization

**Convert to WebP**: Use our [Image to WebP converter](/image-to-webp) to reduce file sizes while maintaining quality.

## HEIC Format: Apple's Innovation

### Best Uses for HEIC
- iPhone photography storage
- High-quality image archiving
- When file size efficiency is critical

### HEIC Advantages
- 50% smaller files than JPEG
- Better quality at same file size
- Supports 16-bit color depth
- Can store multiple images (Live Photos)

### HEIC Disadvantages
- Limited to Apple ecosystem
- Poor compatibility with Windows/Android
- Not web-friendly

**Convert HEIC files**: Use our [HEIC to JPEG converter](/heic-to-jpeg) to share iPhone photos universally.

## Format Comparison Table

| Format | Best For | File Size | Quality | Transparency | Browser Support |
|--------|----------|-----------|---------|--------------|-----------------|
| PNG | Graphics, logos | Large | Lossless | Yes | Universal |
| JPEG | Photos | Small | Lossy | No | Universal |
| WebP | Web images | Very Small | Excellent | Yes | Modern browsers |
| HEIC | iPhone storage | Very Small | Excellent | No | Apple only |
| GIF | Simple animations | Medium | Limited colors | Yes | Universal |
| SVG | Vector graphics | Tiny | Scalable | Yes | Modern browsers |

## Choosing the Right Format

### For Websites
1. **Hero images**: WebP with JPEG fallback
2. **Product photos**: WebP for modern browsers, JPEG for compatibility
3. **Logos**: SVG for scalability, PNG for raster
4. **Screenshots**: PNG for clarity

### For Social Media
1. **Instagram**: JPEG for photos, PNG for graphics
2. **Facebook**: JPEG for most content
3. **Twitter**: JPEG for photos, PNG for graphics with text
4. **LinkedIn**: JPEG for professional photos

### For Print
1. **High-quality prints**: PNG or TIFF
2. **Brochures**: JPEG at high quality
3. **Business cards**: Vector formats (PDF, AI) preferred

## Conversion Best Practices

### Quality Settings
- **Web use**: 80-85% quality for JPEG
- **Print**: 95%+ quality
- **Thumbnails**: 70-75% quality acceptable

### File Size Optimization
1. **Resize before converting**: Don't convert oversized images
2. **Choose appropriate quality**: Balance size vs. appearance
3. **Consider your audience**: Mobile users prefer smaller files
4. **Test different formats**: Compare results for your specific use case

## Future-Proofing Your Image Strategy

### Emerging Formats
- **AVIF**: Next-generation format with excellent compression
- **JPEG XL**: Successor to JPEG with modern features
- **WebP 2**: Improved version in development

### Responsive Images
Use the `<picture>` element to serve different formats:

\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
\`\`\`

## Tools for Format Conversion

- **PNG to JPEG**: Perfect for reducing file sizes of photographs
- **HEIC to JPEG**: Essential for sharing iPhone photos
- **Image to WebP**: Optimize for modern web performance
- **SVG to PNG**: Convert vector graphics to raster when needed

## Conclusion

Choosing the right image format depends on your specific needs, audience, and platform. While JPEG remains the standard for photographs and PNG for graphics with transparency, newer formats like WebP offer significant advantages for web use.

Start by identifying your primary use case, consider your audience's browser capabilities, and don't be afraid to use multiple formats with fallbacks. The extra effort in optimization pays dividends in faster loading times, better user experience, and improved SEO rankings.

Remember: there's no one-size-fits-all solution. Test different formats for your specific content and measure the results to find what works best for your project.`,
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
    content: `# JSON for Beginners: Complete Guide to Understanding and Using JSON in 2025

JSON (JavaScript Object Notation) has become the universal language of data exchange on the web. Whether you're a developer building APIs, a marketer working with analytics data, or simply curious about how modern applications communicate, understanding JSON is essential.

## What is JSON?

JSON is a lightweight, text-based data interchange format that's easy for humans to read and write, and easy for machines to parse and generate. Despite its name suggesting a connection to JavaScript, JSON is language-independent and used across virtually all programming languages.

### Why JSON Matters
- **Universal compatibility**: Works with every modern programming language
- **Human-readable**: Easy to understand and debug
- **Lightweight**: Minimal syntax means smaller file sizes
- **Web-native**: Perfect for APIs and web services

## JSON Syntax Rules

Understanding JSON syntax is crucial for working with data effectively:

### Basic Rules
1. **Data is in name/value pairs**: \`"name": "value"\`
2. **Data is separated by commas**: \`"name": "value", "age": 30\`
3. **Curly braces hold objects**: \`{"name": "John"}\`
4. **Square brackets hold arrays**: \`[1, 2, 3]\`
5. **Strings use double quotes**: \`"Hello World"\` (not single quotes)

### Data Types in JSON
- **String**: \`"Hello World"\`
- **Number**: \`42\`, \`3.14\`, \`-10\`
- **Boolean**: \`true\`, \`false\`
- **null**: \`null\`
- **Object**: \`{"key": "value"}\`
- **Array**: \`[1, 2, 3]\`

## Real-World JSON Examples

### Simple User Profile
\`\`\`json
{
  "name": "Sarah Johnson",
  "age": 28,
  "email": "sarah@example.com",
  "isActive": true,
  "profile": null
}
\`\`\`

### E-commerce Product
\`\`\`json
{
  "id": 12345,
  "name": "Wireless Headphones",
  "price": 99.99,
  "inStock": true,
  "categories": ["Electronics", "Audio", "Wireless"],
  "specifications": {
    "battery": "20 hours",
    "connectivity": "Bluetooth 5.0",
    "weight": "250g"
  },
  "reviews": [
    {
      "rating": 5,
      "comment": "Excellent sound quality!",
      "reviewer": "Alex M."
    },
    {
      "rating": 4,
      "comment": "Great battery life",
      "reviewer": "Jordan K."
    }
  ]
}
\`\`\`

## Common JSON Use Cases

### 1. API Responses
Most modern APIs return data in JSON format:

\`\`\`json
{
  "status": "success",
  "data": {
    "users": [
      {"id": 1, "name": "John"},
      {"id": 2, "name": "Jane"}
    ]
  },
  "meta": {
    "total": 2,
    "page": 1
  }
}
\`\`\`

### 2. Configuration Files
Many applications use JSON for configuration:

\`\`\`json
{
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "myapp"
  },
  "features": {
    "authentication": true,
    "logging": true,
    "caching": false
  }
}
\`\`\`

### 3. Data Storage
NoSQL databases often store data in JSON-like formats:

\`\`\`json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Blog Post Title",
  "content": "Post content here...",
  "author": "John Doe",
  "tags": ["web", "development", "json"],
  "publishedAt": "2025-01-15T10:00:00Z"
}
\`\`\`

## Working with JSON

### Formatting and Validation
Properly formatted JSON is crucial for debugging and readability. Use our [JSON Formatter](/json-formatter) to:
- **Format**: Add proper indentation and line breaks
- **Validate**: Check for syntax errors
- **Minify**: Remove whitespace for production

### Common JSON Errors and How to Fix Them

#### 1. Missing Quotes
**Wrong**: \`{name: "John"}\`
**Correct**: \`{"name": "John"}\`

#### 2. Trailing Commas
**Wrong**: \`{"name": "John", "age": 30,}\`
**Correct**: \`{"name": "John", "age": 30}\`

#### 3. Single Quotes
**Wrong**: \`{'name': 'John'}\`
**Correct**: \`{"name": "John"}\`

#### 4. Unescaped Special Characters
**Wrong**: \`{"message": "It's a beautiful day"}\`
**Correct**: \`{"message": "It's a beautiful day"}\`

## JSON vs Other Data Formats

### JSON vs XML
- **JSON**: Lighter, easier to read, faster to parse
- **XML**: More verbose, supports attributes, better for documents

### JSON vs CSV
- **JSON**: Hierarchical data, complex structures
- **CSV**: Flat data, simpler, better for spreadsheets

### JSON vs YAML
- **JSON**: More compact, better for APIs
- **YAML**: More human-readable, supports comments

## Best Practices for JSON

### Structure Design
1. **Use consistent naming**: Choose camelCase or snake_case and stick with it
2. **Keep it flat when possible**: Avoid unnecessary nesting
3. **Use meaningful names**: \`"userId"\` is better than \`"id"\`
4. **Group related data**: Use objects to organize related fields

### Performance Tips
1. **Minimize data**: Only include necessary fields
2. **Use appropriate data types**: Don't stringify numbers
3. **Consider pagination**: For large datasets, implement pagination
4. **Cache when possible**: Reduce API calls with smart caching

## JSON in Different Programming Languages

### JavaScript
\`\`\`javascript
// Parse JSON string
const data = JSON.parse('{"name": "John"}');

// Convert object to JSON
const jsonString = JSON.stringify({name: "John"});
\`\`\`

### Python
\`\`\`python
import json

# Parse JSON string
data = json.loads('{"name": "John"}')

# Convert dictionary to JSON
json_string = json.dumps({"name": "John"})
\`\`\`

### PHP
\`\`\`php
// Parse JSON string
$data = json_decode('{"name": "John"}', true);

// Convert array to JSON
$json_string = json_encode(["name" => "John"]);
\`\`\`

## Advanced JSON Concepts

### JSON Schema
Define the structure and validation rules for your JSON data:

\`\`\`json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "age": {"type": "number", "minimum": 0}
  },
  "required": ["name"]
}
\`\`\`

### JSON-LD (Linked Data)
Add semantic meaning to your JSON:

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Software Developer"
}
\`\`\`

## Debugging JSON Issues

### Common Problems
1. **Syntax errors**: Use a JSON validator to catch issues
2. **Data type mismatches**: Ensure your data types match expectations
3. **Encoding issues**: Watch out for special characters
4. **Size limits**: Be aware of JSON payload size restrictions

### Debugging Tools
- **Browser DevTools**: Built-in JSON formatting
- **Online formatters**: Quick validation and formatting
- **Command line tools**: \`jq\` for advanced JSON processing

## Security Considerations

### Input Validation
Always validate JSON input:
- Check data types
- Validate required fields
- Sanitize string inputs
- Implement size limits

### Common Vulnerabilities
- **JSON injection**: Validate and sanitize input
- **Large payloads**: Implement size limits
- **Nested objects**: Prevent deeply nested structures

## JSON Tools and Resources

### Essential Tools
- **JSON Formatter**: Format and validate JSON data
- **API testing tools**: Postman, curl, Insomnia
- **Code editors**: VSCode, Sublime Text with JSON support
- **Command line**: jq for JSON processing

### Learning Resources
- **Official JSON specification**: json.org
- **API documentation**: Learn from well-designed APIs
- **Practice exercises**: Build small projects using JSON

## Conclusion

JSON has revolutionized how we exchange data on the web. Its simplicity, readability, and universal support make it the perfect choice for modern applications. Whether you're building APIs, configuring applications, or storing data, understanding JSON is essential.

Start with the basics, practice with real examples, and gradually explore more advanced concepts. Remember to always validate your JSON, follow best practices, and choose the right tools for your workflow.

The investment in learning JSON pays dividends across all areas of modern development and data management. Master JSON, and you'll be prepared for the data-driven future of technology.`,
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
    content: `# The Content Writer's Guide to Word Count: How Many Words for Maximum Impact

In the world of content creation, word count isn't just a number—it's a strategic decision that affects readability, SEO rankings, user engagement, and platform performance. Whether you're writing a tweet, blog post, or academic paper, understanding optimal word counts can make the difference between content that resonates and content that gets ignored.

## Why Word Count Matters

### SEO and Search Rankings
Search engines consider content length as a ranking factor:
- **Comprehensive coverage**: Longer content often covers topics more thoroughly
- **Keyword opportunities**: More space for natural keyword integration
- **User engagement signals**: Time on page increases with longer, valuable content
- **Authority building**: In-depth content establishes expertise

### User Experience
Word count affects how users interact with your content:
- **Attention spans**: Match content length to user expectations
- **Information density**: Balance detail with readability
- **Scanning behavior**: Shorter content is easier to scan quickly
- **Value perception**: Appropriate length signals content quality

### Platform Optimization
Different platforms have different optimal lengths:
- **Social media algorithms**: Favor specific post lengths
- **Email marketing**: Subject line and body length affect open rates
- **Academic standards**: Strict word count requirements
- **Publishing guidelines**: Magazines and blogs have preferred lengths

## Word Count by Content Type

### Blog Posts and Articles

#### Short-Form Content (300-800 words)
**Best for:**
- Quick tips and tutorials
- News updates and announcements
- Simple how-to guides
- Product descriptions

**Example structure:**
- Introduction: 50-100 words
- Main content: 200-600 words
- Conclusion: 50-100 words

#### Medium-Form Content (800-1,500 words)
**Best for:**
- Detailed tutorials
- Industry insights
- Product comparisons
- Personal stories

**Example: "How to Choose the Right Image Format"**
- Problem identification: 150 words
- Solution overview: 200 words
- Detailed comparison: 800 words
- Recommendations: 200 words
- Conclusion: 150 words

#### Long-Form Content (1,500-3,000+ words)
**Best for:**
- Comprehensive guides
- Research-backed articles
- Pillar content for SEO
- Thought leadership pieces

**Performance benefits:**
- Higher search rankings for competitive keywords
- More social shares and backlinks
- Greater time on page
- Higher perceived value

### Social Media Platforms

#### Twitter/X
- **Optimal length**: 71-100 characters
- **Maximum**: 280 characters
- **Best practices**: 
  - Leave room for retweets and comments
  - Use compelling hooks in first 100 characters
  - Include clear calls-to-action

#### LinkedIn Posts
- **Short posts**: 150-300 words
- **Long posts**: 1,200-1,700 words
- **Articles**: 1,900-2,000 words
- **Best practices**:
  - Start with a compelling hook
  - Use line breaks for readability
  - Include relevant hashtags (3-5)

#### Facebook
- **Optimal**: 40-80 characters for highest engagement
- **Maximum effective**: 500 characters
- **Video descriptions**: 125 characters
- **Best practices**:
  - Front-load important information
  - Use emotional hooks
  - Include clear calls-to-action

#### Instagram
- **Captions**: 125-150 characters for optimal engagement
- **Maximum**: 2,200 characters
- **Stories text**: Keep minimal for visual impact
- **Best practices**:
  - First line is crucial (appears in feeds)
  - Use line breaks and emojis
  - Include relevant hashtags

### Email Marketing

#### Subject Lines
- **Optimal**: 30-50 characters (6-10 words)
- **Mobile optimization**: 25-30 characters
- **A/B testing**: Test different lengths for your audience

#### Email Body
- **Newsletters**: 200-300 words
- **Promotional emails**: 150-200 words
- **Transactional emails**: 50-125 words
- **Best practices**:
  - Scannable content with bullet points
  - Clear call-to-action
  - Mobile-friendly formatting

### Academic and Professional Writing

#### Academic Papers
- **Abstracts**: 150-300 words
- **Research papers**: 3,000-10,000 words
- **Dissertations**: 80,000-100,000 words
- **Conference papers**: 3,000-6,000 words

#### Business Documents
- **Executive summaries**: 300-400 words
- **Proposals**: 1,500-3,000 words
- **Reports**: 2,000-5,000 words
- **Memos**: 200-500 words

## Content Length Strategy by Goal

### SEO-Focused Content

#### Competitive Keywords
- **Minimum**: 1,500 words
- **Optimal**: 2,000-3,000 words
- **Strategy**: Comprehensive coverage beats keyword density

#### Long-Tail Keywords
- **Minimum**: 800 words
- **Optimal**: 1,200-1,800 words
- **Strategy**: Focus on specific user intent

#### Local SEO
- **Location pages**: 500-800 words
- **Service pages**: 800-1,200 words
- **Strategy**: Include local keywords naturally

### Engagement-Focused Content

#### Entertainment Content
- **Listicles**: 1,000-1,500 words
- **Stories**: 800-1,200 words
- **Humor pieces**: 500-800 words

#### Educational Content
- **Tutorials**: 1,200-2,500 words
- **Guides**: 2,000-4,000 words
- **Courses**: 500-800 words per lesson

### Conversion-Focused Content

#### Landing Pages
- **Hero section**: 50-100 words
- **Benefits section**: 200-300 words
- **Features section**: 300-500 words
- **Total page**: 800-1,200 words

#### Product Descriptions
- **Simple products**: 50-100 words
- **Complex products**: 200-400 words
- **Technical products**: 400-800 words

## Tools for Word Count Optimization

### Writing and Analysis Tools
Use our [Word Counter](/word-counter) to:
- Track word count in real-time
- Analyze text density and readability
- Calculate reading time
- Monitor character limits for social media

### SEO Analysis Tools
- **Content gap analysis**: Identify optimal length for target keywords
- **Competitor analysis**: See what length performs well in your niche
- **SERP analysis**: Study top-ranking content length

### Readability Tools
- **Flesch-Kincaid scores**: Ensure appropriate reading level
- **Sentence length analysis**: Balance short and long sentences
- **Paragraph structure**: Optimize for scanning

## Word Count Best Practices

### Quality Over Quantity
- **Don't pad content**: Every word should add value
- **Natural length**: Let content dictate length, not arbitrary targets
- **User focus**: Write for your audience, not search engines

### Strategic Planning
1. **Research competitors**: Analyze top-performing content in your niche
2. **Know your audience**: Consider their time constraints and preferences
3. **Platform optimization**: Tailor length to platform best practices
4. **Content goals**: Align length with intended outcomes

### Testing and Optimization
- **A/B testing**: Test different lengths for similar content
- **Analytics monitoring**: Track engagement metrics by content length
- **Continuous improvement**: Refine based on performance data

## Common Word Count Mistakes

### Too Short for Value
- **Problem**: Insufficient coverage of topic
- **Solution**: Research thoroughly before writing
- **Red flags**: High bounce rates, low time on page

### Too Long for Purpose
- **Problem**: Overwhelming readers with unnecessary detail
- **Solution**: Edit ruthlessly, break into multiple pieces
- **Red flags**: Low scroll depth, high exit rates

### Ignoring Platform Norms
- **Problem**: Using blog post length for social media
- **Solution**: Adapt content for each platform
- **Red flags**: Low engagement, poor reach

## Industry-Specific Guidelines

### Technology and Software
- **Product announcements**: 400-600 words
- **Technical tutorials**: 1,500-3,000 words
- **API documentation**: As needed for clarity

### Healthcare and Wellness
- **Health tips**: 800-1,200 words
- **Medical research**: 2,000-4,000 words
- **Patient education**: 500-800 words

### Finance and Business
- **Market analysis**: 1,200-2,000 words
- **Investment guides**: 2,000-3,500 words
- **Company news**: 300-500 words

## Future Trends in Content Length

### Voice Search Optimization
- **Conversational queries**: Longer, natural language content
- **Featured snippets**: Concise, direct answers within longer content
- **Local voice search**: Specific, location-focused content

### AI and Personalization
- **Dynamic content**: Personalized length based on user behavior
- **Smart summaries**: AI-generated summaries for long content
- **Adaptive formatting**: Content that adjusts to user preferences

## Measuring Success Beyond Word Count

### Engagement Metrics
- **Time on page**: Quality matters more than length
- **Social shares**: Valuable content gets shared regardless of length
- **Comments and interactions**: Engagement indicates value

### Business Metrics
- **Lead generation**: Conversion rates by content length
- **Brand awareness**: Reach and impression metrics
- **Customer education**: Support ticket reduction

## Conclusion

Word count is a powerful tool in the content creator's toolkit, but it's not a magic number. The optimal length for your content depends on your audience, platform, goals, and topic complexity.

Start with industry benchmarks, but always prioritize value and user experience. Use analytics to understand what works for your specific audience, and don't be afraid to experiment with different lengths.

Remember: the best content is the right length to fully serve your audience's needs—no more, no less. Focus on creating valuable, engaging content, and the word count will naturally follow.

Whether you're crafting a tweet or writing a comprehensive guide, let purpose drive length, not the other way around. Your audience will thank you for respecting their time while delivering the value they seek.`,
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