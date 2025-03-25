'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AlarmsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold text-gray-800">
              Alarms
            </h1>
            <p className="text-lg text-gray-600">
              Set and manage your alarms with precision. Create one-time or recurring alarms with custom sound options.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-sm border border-gray-200/50">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-medium text-gray-800">
                My Alarms
              </h2>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Alarm
              </button>
            </div>

            <div className="space-y-4">
              {/* Placeholder for when no alarms exist */}
              <div className="text-center py-12 text-gray-500">
                No alarms set. Click "New Alarm" to create one.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-gray-200/50">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Quick Settings
              </h3>
              <div className="space-y-4">
                <button className="w-full px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-left text-gray-700 transition-colors">
                  Create New Alarm
                </button>
                <button className="w-full px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-left text-gray-700 transition-colors">
                  Import Calendar Events
                </button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-gray-200/50">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Pro Tips
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Double-click any alarm to edit its settings
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Set recurring alarms for regular reminders
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 