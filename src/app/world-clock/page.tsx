import { WorldClock } from "@/components/WorldClock";

export default function WorldClockPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">World Clock</h1>
        <div className="card">
          <WorldClock />
        </div>
      </div>
    </div>
  );
} 