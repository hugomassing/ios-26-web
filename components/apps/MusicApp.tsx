'use client';

import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';

export default function MusicApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(142);
  const [duration] = useState(245);
  const [isLiked, setIsLiked] = useState(false);

  const currentSong = {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    artwork: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-900 via-red-900 to-yellow-800 text-white">
      {/* Header */}
      <div className="p-4 text-center">
        <h1 className="text-lg font-semibold">Now Playing</h1>
      </div>

      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-64 h-64 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <img
            src={currentSong.artwork}
            alt={currentSong.album}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Song Info */}
      <div className="px-8 pb-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{currentSong.title}</h2>
          <p className="text-lg text-gray-300">{currentSong.artist}</p>
          <p className="text-sm text-gray-400">{currentSong.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-600 rounded-full h-1 mb-2">
            <div
              className="bg-white h-1 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-8 mb-6">
          <button className="text-gray-300 hover:text-white transition-colors">
            <SkipBack className="w-8 h-8" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-900 hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>
          
          <button className="text-gray-300 hover:text-white transition-colors">
            <SkipForward className="w-8 h-8" />
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`transition-colors ${isLiked ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-gray-300" />
            <div className="w-20 bg-gray-600 rounded-full h-1">
              <div className="bg-white h-1 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}