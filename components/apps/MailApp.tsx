'use client';

import { useState } from 'react';
import { Search, Edit, Archive, Trash2 } from 'lucide-react';

export default function MailApp() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const emails = [
    {
      id: 1,
      sender: 'John Smith',
      subject: 'Project Update - Q4 Results',
      preview: 'Hi there, I wanted to share the latest updates on our Q4 project results. The team has made significant progress...',
      time: '2:30 PM',
      read: false,
      important: true
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      subject: 'Meeting Tomorrow at 10 AM',
      preview: 'Just a reminder about our meeting scheduled for tomorrow at 10 AM. We\'ll be discussing the new marketing strategy...',
      time: '1:15 PM',
      read: true,
      important: false
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      subject: 'Invoice #12345 - Payment Due',
      preview: 'This is a friendly reminder that your invoice #12345 is due for payment. Please find the details attached...',
      time: '11:45 AM',
      read: false,
      important: false
    },
    {
      id: 4,
      sender: 'Emily Davis',
      subject: 'Welcome to the Team!',
      preview: 'We\'re thrilled to welcome you to our team! Here\'s everything you need to know to get started...',
      time: 'Yesterday',
      read: true,
      important: true
    }
  ];

  if (selectedEmail) {
    const email = emails.find(e => e.id === selectedEmail);
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Email Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <button
            onClick={() => setSelectedEmail(null)}
            className="text-blue-500 font-medium mb-3"
          >
            ← Inbox
          </button>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{email?.subject}</h2>
          <p className="text-sm text-gray-600">From: {email?.sender}</p>
          <p className="text-sm text-gray-500">{email?.time}</p>
        </div>

        {/* Email Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="prose max-w-none">
            <p className="text-gray-900 leading-relaxed">
              {email?.preview}
            </p>
            <br />
            <p className="text-gray-900 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <br />
            <p className="text-gray-900 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <p className="text-gray-900 leading-relaxed">
              Best regards,<br />
              {email?.sender}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 p-4 flex justify-around">
          <button className="flex flex-col items-center text-blue-500">
            <Archive className="w-6 h-6 mb-1" />
            <span className="text-xs">Archive</span>
          </button>
          <button className="flex flex-col items-center text-red-500">
            <Trash2 className="w-6 h-6 mb-1" />
            <span className="text-xs">Delete</span>
          </button>
          <button className="flex flex-col items-center text-blue-500">
            <Edit className="w-6 h-6 mb-1" />
            <span className="text-xs">Reply</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Mail</h1>
          <Edit className="w-6 h-6 text-blue-500" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Mail"
            className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Mailbox Info */}
      <div className="bg-blue-50 p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">Inbox</span>
          <span className="text-sm text-blue-700">
            {emails.filter(e => !e.read).length} unread
          </span>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => setSelectedEmail(email.id)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              !email.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={`font-semibold text-sm ${!email.read ? 'text-gray-900' : 'text-gray-600'}`}>
                  {email.sender}
                </span>
                {email.important && (
                  <span className="text-orange-500 text-xs">★</span>
                )}
                {!email.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className="text-xs text-gray-500">{email.time}</span>
            </div>
            <h3 className={`font-medium text-sm mb-1 ${!email.read ? 'text-gray-900' : 'text-gray-700'}`}>
              {email.subject}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {email.preview}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}