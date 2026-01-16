import { SolarClock3D } from '@/components/SolarClock3D';

export const dynamic = 'force-dynamic';

export default function SolarClock3DPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">Solar Clock 3D</h1>
        <div className="card">
          <SolarClock3D />
        </div>
      </div>
    </div>
  );
} 