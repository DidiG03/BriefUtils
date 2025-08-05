import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Counter - Real-Time Text Analysis | Characters, Reading Time | BriefUtils',
  description: 'Professional word counter with reading time, character count & text density analysis. Perfect for essays, blogs, social media. Used by 50,000+ writers monthly.',
  keywords: 'word counter, character counter, text analysis, reading time calculator, essay word count, blog post length, social media character limits, writing tools',
  openGraph: {
    title: 'Word Counter - Real-Time Text Analysis Tool',
    description: 'Professional word counter with reading time, character count & text density analysis. Perfect for essays, blogs, social media posts.',
    type: 'website',
    url: 'https://briefutils.com/word-counter',
    images: [{
      url: 'https://briefutils.com/images/word-counter-tool.jpg',
      width: 1200,
      height: 630,
      alt: 'Word Counter Text Analysis Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Counter - Real-Time Text Analysis',
    description: 'Professional word counter with reading time, character count & text density analysis. Perfect for writers and students.',
    images: ['https://briefutils.com/images/word-counter-tool.jpg']
  },
  alternates: {
    canonical: 'https://briefutils.com/word-counter',
  },
};