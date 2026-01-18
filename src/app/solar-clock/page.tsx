import { SolarClock2D } from '@/components/SolarClock2D';

export const dynamic = 'force-dynamic';

export default function SolarClockPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">Solar Clock 2D</h1>
        <div className="card">
          <SolarClock2D />
        </div>
      </div>
    </div>
  );
} 