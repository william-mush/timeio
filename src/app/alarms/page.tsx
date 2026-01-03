import { AlarmManager } from "@/components/Alarm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Alarm Clock - Set Alarms & Timers",
  description: "Set alarms and timers online with our free alarm clock. Create multiple alarms, customize sounds, and get browser notifications. Works on desktop and mobile.",
  keywords: [
    "online alarm clock",
    "web alarm",
    "set alarm",
    "alarm timer",
    "wake up alarm",
    "reminder alarm",
    "browser alarm",
    "free alarm clock",
    "digital alarm clock",
  ],
  openGraph: {
    title: "Online Alarm Clock - Time.IO",
    description: "Set alarms and timers online. Free, no download required.",
    type: "website",
    url: "https://time.io/alarms",
  },
  alternates: {
    canonical: "https://time.io/alarms",
  },
};

export default function AlarmsPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">Online Alarm Clock</h1>
        <div className="card">
          <AlarmManager />
        </div>

        {/* SEO Content */}
        <div className="mt-12 max-w-3xl mx-auto text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Free Online Alarm Clock</h2>
          <p className="mb-4">
            Set alarms directly in your browser with Time.IO's free online alarm clock.
            No downloads or installations required - just set your alarm and we'll notify you
            when it's time.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Features</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Create multiple alarms with custom labels</li>
            <li>Browser notifications (with your permission)</li>
            <li>Syncs across devices when signed in</li>
            <li>Works on desktop, tablet, and mobile</li>
            <li>No app installation needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}