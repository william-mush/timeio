'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeDisplayProps {
  format24Hour?: boolean;
  showMilliseconds?: boolean;
}

export const TimeDisplay = ({ 
  format24Hour = false, 
  showMilliseconds = false 
}: TimeDisplayProps) => {
  const [time, setTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setIsVisible(true);
    }, showMilliseconds ? 10 : 1000);

    return () => clearInterval(interval);
  }, [showMilliseconds]);

  const hours = format24Hour 
    ? time.getHours() 
    : time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const milliseconds = time.getMilliseconds().toString().padStart(3, '0');
  const period = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-baseline justify-center space-x-2">
          <span className="text-8xl font-bold tracking-tighter">
            {hours}:{minutes}
          </span>
          <motion.span 
            key={seconds}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl text-gray-600"
          >
            :{seconds}
          </motion.span>
          {showMilliseconds && (
            <motion.span 
              key={milliseconds}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl text-gray-400"
            >
              .{milliseconds}
            </motion.span>
          )}
          {!format24Hour && (
            <span className="text-2xl text-gray-500 ml-2">{period}</span>
          )}
        </div>
        <div className="mt-4 text-gray-500">
          {time.toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </motion.div>
    </div>
  );
}; 