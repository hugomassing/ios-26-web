'use client';

import { useState } from 'react';
import { Search, Navigation, MapPin, Layers } from 'lucide-react';

export default function MapsApp() {
  const [searchTerm, setSearchTerm] = useState('');

  const recentSearches = [
    { name: 'Starbucks', address: '123 Main St, New York, NY' },
    { name: 'Central Park', address: 'New York, NY 10024' },
    { name: 'Times Square', address: 'Manhattan, NY 10036' },
    { name: 'Brooklyn Bridge', address: 'New York, NY 10038' }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 relative z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a place or address"
            className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-green-100 via-blue-100 to-gray-100">
        {/* Simulated Map */}
        <div className="w-full h-full relative overflow-hidden">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-12 h-full w-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>

          {/* Simulated Streets */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400"></div>
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400"></div>
          </div>

          {/* Location Pins */}
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg" />
          </div>
          <div className="absolute top-2/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
            <MapPin className="w-6 h-6 text-blue-500 drop-shadow-lg" />
          </div>

          {/* Current Location */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
            <Layers className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50">
            <Navigation className="w-5 h-5 text-blue-500" />
          </button>
        </div>

        {/* Location Card */}
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-1">Current Location</h3>
          <p className="text-sm text-gray-600 mb-3">
            123 Demo Street, Sample City, NY 10001
          </p>
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium">
              Directions
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      {searchTerm && (
        <div className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 max-h-64 overflow-y-auto z-20">
          {recentSearches
            .filter(place => 
              place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              place.address.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((place, index) => (
              <div key={index} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900">{place.name}</h4>
                <p className="text-sm text-gray-600">{place.address}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}