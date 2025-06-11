'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const events = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', date: new Date().toDateString() },
    { id: 2, title: 'Lunch with Sarah', time: '12:30 PM', date: new Date().toDateString() },
    { id: 3, title: 'Project Deadline', time: '5:00 PM', date: new Date().toDateString() }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-red-500 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <Plus className="w-6 h-6" />
        </div>
        
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-red-400 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-red-400 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-y-auto">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className={`h-16 border-b border-r border-gray-100 p-2 cursor-pointer hover:bg-gray-50 ${
                day && isToday(day) ? 'bg-red-50' : ''
              }`}
              onClick={() => day && setSelectedDate(day)}
            >
              {day && (
                <div className="flex flex-col h-full">
                  <span className={`text-sm font-medium ${
                    isToday(day) ? 'text-red-500 font-bold' : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </span>
                  {isToday(day) && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Today's Events */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Today's Events</h3>
          <div className="space-y-2">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}