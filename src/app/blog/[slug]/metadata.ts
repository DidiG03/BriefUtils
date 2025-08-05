import { Metadata } from 'next';
import { getBlogPost } from '@/data/blog';

interface GenerateMetadataProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | BriefUtils',
      description: 'The requested article could not be found.',
    };
  }

  const title = post.seoTitle || `${post.title} | BriefUtils`;
  const description = post.seoDescription || post.excerpt;
  const url = `https://briefutils.com/blog/${slug}`;
  
  return {
    title,
    description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'BriefUtils',
    robots: 'index, follow',
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url,
      siteName: 'BriefUtils',
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@briefutils',
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:author': post.author,
      'article:published_time': post.publishedAt,
      'article:modified_time': post.updatedAt || post.publishedAt,
      'article:section': post.category,
      'article:tag': post.tags.join(','),
    },
  };
}