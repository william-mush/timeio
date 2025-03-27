'use client';

import { AlarmManager } from "@/components/Alarm";

export default function AlarmsPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">Alarms</h1>
        <div className="card">
          <AlarmManager />
        </div>
      </div>
    </div>
  );
} 