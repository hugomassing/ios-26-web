'use client';

import { useState } from 'react';
import { Phone, PhoneCall, UserPlus, Clock } from 'lucide-react';

export default function PhoneApp() {
  const [activeTab, setActiveTab] = useState('recents');
  const [dialNumber, setDialNumber] = useState('');

  const recentCalls = [
    { id: 1, name: 'John Smith', number: '(555) 123-4567', time: '2:30 PM', type: 'outgoing', missed: false },
    { id: 2, name: 'Sarah Wilson', number: '(555) 987-6543', time: '1:15 PM', type: 'incoming', missed: false },
    { id: 3, name: 'Mike Johnson', number: '(555) 456-7890', time: '11:45 AM', type: 'incoming', missed: true },
    { id: 4, name: 'Emily Davis', number: '(555) 234-5678', time: 'Yesterday', type: 'outgoing', missed: false }
  ];

  const contacts = [
    { id: 1, name: 'John Smith', number: '(555) 123-4567' },
    { id: 2, name: 'Sarah Wilson', number: '(555) 987-6543' },
    { id: 3, name: 'Mike Johnson', number: '(555) 456-7890' },
    { id: 4, name: 'Emily Davis', number: '(555) 234-5678' }
  ];

  const keypadNumbers = [
    [{ num: '1', letters: '' }, { num: '2', letters: 'ABC' }, { num: '3', letters: 'DEF' }],
    [{ num: '4', letters: 'GHI' }, { num: '5', letters: 'JKL' }, { num: '6', letters: 'MNO' }],
    [{ num: '7', letters: 'PQRS' }, { num: '8', letters: 'TUV' }, { num: '9', letters: 'WXYZ' }],
    [{ num: '*', letters: '' }, { num: '0', letters: '+' }, { num: '#', letters: '' }]
  ];

  const handleKeypadPress = (value: string) => {
    setDialNumber(prev => prev + value);
  };

  const renderRecents = () => (
    <div className="flex-1 overflow-y-auto">
      {recentCalls.map((call) => (
        <div key={call.id} className="flex items-center p-4 border-b border-gray-100">
          <div className="flex-1">
            <h3 className={`font-semibold ${call.missed ? 'text-red-500' : 'text-gray-900'}`}>
              {call.name}
            </h3>
            <p className="text-sm text-gray-600">{call.number}</p>
          </div>
          <div className="text-right mr-4">
            <p className="text-sm text-gray-500">{call.time}</p>
            <p className="text-xs text-gray-400">
              {call.type === 'outgoing' ? '↗' : call.missed ? '↙' : '↖'}
            </p>
          </div>
          <button className="text-blue-500 p-2">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );

  const renderContacts = () => (
    <div className="flex-1 overflow-y-auto">
      {contacts.map((contact) => (
        <div key={contact.id} className="flex items-center p-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
            <p className="text-sm text-gray-600">{contact.number}</p>
          </div>
          <button className="text-blue-500 p-2">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );

  const renderKeypad = () => (
    <div className="flex-1 flex flex-col">
      <div className="p-6 text-center">
        <div className="text-2xl font-light text-gray-900 mb-2 min-h-[2.5rem]">
          {dialNumber || 'Enter number'}
        </div>
      </div>
      
      <div className="flex-1 px-8">
        {keypadNumbers.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-8 mb-4">
            {row.map((key) => (
              <button
                key={key.num}
                onClick={() => handleKeypadPress(key.num)}
                className="w-16 h-16 bg-gray-100 hover:bg-gray-200 rounded-full flex flex-col items-center justify-center text-gray-900 transition-colors"
              >
                <span className="text-xl font-light">{key.num}</span>
                {key.letters && (
                  <span className="text-xs text-gray-500 mt-1">{key.letters}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {dialNumber && (
        <div className="p-6 flex justify-center">
          <button className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors">
            <PhoneCall className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Phone</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('recents')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'recents' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500'
          }`}
        >
          Recents
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'contacts' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500'
          }`}
        >
          Contacts
        </button>
        <button
          onClick={() => setActiveTab('keypad')}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'keypad' 
              ? 'text-blue-500 border-b-2 border-blue-500' 
              : 'text-gray-500'
          }`}
        >
          Keypad
        </button>
      </div>

      {/* Content */}
      {activeTab === 'recents' && renderRecents()}
      {activeTab === 'contacts' && renderContacts()}
      {activeTab === 'keypad' && renderKeypad()}
    </div>
  );
}