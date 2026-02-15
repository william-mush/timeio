import { Metadata } from 'next';
import { EmbedBuilder } from '@/components/EmbedBuilder';

export const metadata: Metadata = {
  title: 'Embed a Clock Widget',
  description:
    'Create an embeddable clock widget for any city. Customize theme, format, and style, then copy the embed code for your website.',
  openGraph: {
    title: 'Embed a Clock Widget - Time.IO',
    description:
      'Create an embeddable clock widget for any city. Customize and embed on your website.',
    type: 'website',
    url: 'https://time.io/embed',
  },
  alternates: {
    canonical: 'https://time.io/embed',
  },
};

export default function EmbedPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-2">Embed a Clock Widget</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          Add a live clock to your website for any city in the world.
        </p>
        <EmbedBuilder />
      </div>
    </div>
  );
}
