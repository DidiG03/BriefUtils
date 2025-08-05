import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator - Format, Validate & Minify JSON | BriefUtils',
  description: 'Professional JSON formatter, validator & minifier. Debug APIs, validate syntax, beautify code. Used by 100,000+ developers. Supports large files.',
  keywords: 'json formatter, json validator, json beautifier, json minifier, api debugging, json syntax checker, developer tools, json parser',
  openGraph: {
    title: 'JSON Formatter & Validator - Professional Developer Tool',
    description: 'Professional JSON formatter, validator & minifier. Debug APIs, validate syntax, beautify code. Supports large files.',
    type: 'website',
    url: 'https://briefutils.com/json-formatter',
    images: [{
      url: 'https://briefutils.com/images/json-formatter-tool.jpg',
      width: 1200,
      height: 630,
      alt: 'JSON Formatter and Validator Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter & Validator - Debug APIs',
    description: 'Professional JSON formatter, validator & minifier. Debug APIs, validate syntax, beautify code instantly.',
    images: ['https://briefutils.com/images/json-formatter-tool.jpg']
  },
  alternates: {
    canonical: 'https://briefutils.com/json-formatter',
  },
};