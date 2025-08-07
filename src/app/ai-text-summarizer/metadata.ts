import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Text Summarizer - Free Online Tool | Instant Summaries | BriefUtils',
  description: 'Free AI-powered text summarizer. Create concise summaries of articles, documents, and long texts instantly. No registration required, completely private.',
  keywords: 'ai text summarizer, text summary tool, ai summarizer, automatic text summary, document summarizer, article summarizer, free ai tool',
  openGraph: {
    title: 'AI Text Summarizer - Free Online Tool',
    description: 'Create concise summaries of long texts instantly with our AI-powered summarizer. Free, private, and no registration required.',
    type: 'website',
    url: 'https://briefutils.com/ai-text-summarizer',
    images: [{
      url: 'https://briefutils.com/images/ai-text-summarizer-tool.jpg',
      width: 1200,
      height: 630,
      alt: 'AI Text Summarizer Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Text Summarizer - Free Online Tool',
    description: 'Create concise summaries of long texts instantly with our AI-powered summarizer. Free, private, and no registration required.',
    images: ['https://briefutils.com/images/ai-text-summarizer-tool.jpg']
  },
  alternates: {
    canonical: 'https://briefutils.com/ai-text-summarizer',
  },
};