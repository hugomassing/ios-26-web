'use client';

import { 
  Wifi, 
  Bluetooth, 
  Volume2, 
  Moon, 
  Shield, 
  Bell, 
  User, 
  Battery, 
  Smartphone,
  ChevronRight 
} from 'lucide-react';

export default function SettingsApp() {
  const settingsGroups = [
    {
      title: 'Connectivity',
      items: [
        { icon: Wifi, label: 'Wi-Fi', value: 'MyNetwork', color: 'text-blue-500' },
        { icon: Bluetooth, label: 'Bluetooth', value: 'On', color: 'text-blue-500' },
      ]
    },
    {
      title: 'Display & Sound',
      items: [
        { icon: Moon, label: 'Dark Mode', value: 'Off', color: 'text-gray-600' },
        { icon: Volume2, label: 'Sounds & Haptics', value: '', color: 'text-gray-600' },
        { icon: Smartphone, label: 'Display & Brightness', value: '', color: 'text-gray-600' },
      ]
    },
    {
      title: 'Personal',
      items: [
        { icon: User, label: 'Apple ID', value: 'john@example.com', color: 'text-gray-600' },
        { icon: Bell, label: 'Notifications', value: '', color: 'text-red-500' },
        { icon: Shield, label: 'Privacy & Security', value: '', color: 'text-blue-500' },
      ]
    },
    {
      title: 'Device',
      items: [
        { icon: Battery, label: 'Battery', value: '87%', color: 'text-green-500' },
        { icon: Smartphone, label: 'General', value: '', color: 'text-gray-600' },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      {/* Search */}
      <div className="bg-white px-4 pb-4">
        <div className="bg-gray-100 rounded-lg p-3">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Settings Groups */}
      <div className="flex-1 overflow-y-auto">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <div className="px-4 py-2">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {group.title}
              </h2>
            </div>
            
            <div className="bg-white mx-4 rounded-xl overflow-hidden shadow-sm">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                    <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3 ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{item.label}</span>
                        <div className="flex items-center space-x-2">
                          {item.value && (
                            <span className="text-sm text-gray-500">{item.value}</span>
                          )}
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {itemIndex < group.items.length - 1 && (
                    <div className="border-b border-gray-100 ml-14"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Version Info */}
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-gray-500">iOS 17.2.1</p>
          <p className="text-xs text-gray-400 mt-1">iPhone 15 Pro</p>
        </div>
      </div>
    </div>
  );
}