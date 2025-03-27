import { WorldMap } from "@/components/WorldMap";

export default function WorldMapPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">World Map</h1>
        <div className="card">
          <WorldMap />
        </div>
      </div>
    </div>
  );
} 