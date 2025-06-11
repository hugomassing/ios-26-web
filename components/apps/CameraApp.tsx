'use client';

import { useState } from 'react';
import { Camera, RotateCcw, Zap, ZapOff, Grid3X3 } from 'lucide-react';

export default function CameraApp() {
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [flash, setFlash] = useState<'on' | 'off' | 'auto'>('auto');
  const [grid, setGrid] = useState(false);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Camera Viewfinder */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {/* Simulated Camera View */}
        <div className="text-white text-center">
          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg opacity-50">Camera View</p>
          <p className="text-sm opacity-30 mt-2">Demo Mode</p>
        </div>

        {/* Grid Overlay */}
        {grid && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white opacity-20"></div>
              ))}
            </div>
          </div>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button
            onClick={() => setFlash(flash === 'off' ? 'on' : flash === 'on' ? 'auto' : 'off')}
            className="p-2 bg-black bg-opacity-30 rounded-full text-white"
          >
            {flash === 'off' ? (
              <ZapOff className="w-5 h-5" />
            ) : (
              <Zap className="w-5 h-5" />
            )}
          </button>
          
          <div className="text-white text-sm bg-black bg-opacity-30 px-3 py-1 rounded-full">
            {flash.toUpperCase()}
          </div>
          
          <button
            onClick={() => setGrid(!grid)}
            className={`p-2 bg-black bg-opacity-30 rounded-full ${grid ? 'text-yellow-400' : 'text-white'}`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-4 right-4">
          {/* Mode Selector */}
          <div className="flex justify-center mb-6">
            <div className="bg-black bg-opacity-30 rounded-full p-1 flex">
              <button
                onClick={() => setMode('photo')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  mode === 'photo' ? 'bg-yellow-400 text-black' : 'text-white'
                }`}
              >
                PHOTO
              </button>
              <button
                onClick={() => setMode('video')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  mode === 'video' ? 'bg-yellow-400 text-black' : 'text-white'
                }`}
              >
                VIDEO
              </button>
            </div>
          </div>

          {/* Capture Controls */}
          <div className="flex items-center justify-between">
            {/* Gallery Button */}
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-400 rounded"></div>
            </div>

            {/* Capture Button */}
            <button
              className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform active:scale-95 ${
                mode === 'photo' ? 'bg-white' : 'bg-red-500'
              }`}
            >
              <div
                className={`rounded-full transition-all ${
                  mode === 'photo' 
                    ? 'w-16 h-16 bg-white border-2 border-gray-300' 
                    : 'w-8 h-8 bg-red-600'
                }`}
              ></div>
            </button>

            {/* Flip Camera Button */}
            <button className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center text-white">
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}