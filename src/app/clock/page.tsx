import { QuipClock } from '@/components/QuipClock';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Every Minute Matters | time.io',
  description:
    'A beautiful live clock where every minute of the day has its own unique, clever message. 1,440 handcrafted quips — one for every minute.',
  keywords: [
    'clever clock',
    'quip clock',
    'every minute matters',
    'fun clock',
    'time quotes',
    'creative clock',
    'minute messages',
    'live clock',
  ],
  openGraph: {
    title: 'Every Minute Matters - Time.IO',
    description:
      'A beautiful live clock where every minute has its own unique clever message.',
    type: 'website',
    url: 'https://time.io/clock',
  },
  alternates: {
    canonical: 'https://time.io/clock',
  },
};

export default function ClockPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <QuipClock />
      </div>
    </div>
  );
}
