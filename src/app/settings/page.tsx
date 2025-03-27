import { Settings } from "@/components/Settings";

export default function SettingsPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">Settings</h1>
        <div className="card">
          <Settings />
        </div>
      </div>
    </div>
  );
} 