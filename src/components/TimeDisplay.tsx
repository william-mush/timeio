import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-medium text-gray-700">
      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
      <span className="tabular-nums">
        {time.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })}
      </span>
    </div>
  );
} 