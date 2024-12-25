"use client"
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          return 95;
        }
        return prev + 0.5;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="max-w-sm w-full px-4">
        <div className="text-center space-y-8">
          <Loader2 className="w-16 h-16 animate-spin mx-auto text-blue-600" />
          
          <h2 className="text-2xl font-semibold text-gray-800">
            LitScout is scouting right now
          </h2>
          
          <p className="text-gray-600 text-lg">Please be patient</p>
          
          <div className="relative w-full max-w-md mx-auto">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-200 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;