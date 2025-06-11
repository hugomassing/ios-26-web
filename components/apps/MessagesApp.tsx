'use client';

import { useState } from 'react';
import { Send, Search, Plus } from 'lucide-react';

export default function MessagesApp() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'John Smith',
      lastMessage: 'Hey, how are you doing?',
      time: '2:30 PM',
      unread: 2,
      avatar: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      lastMessage: 'Thanks for the help yesterday!',
      time: '1:15 PM',
      unread: 0,
      avatar: 'bg-pink-500'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      lastMessage: 'See you at the meeting',
      time: '11:45 AM',
      unread: 1,
      avatar: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Emily Davis',
      lastMessage: 'Great job on the project!',
      time: 'Yesterday',
      unread: 0,
      avatar: 'bg-purple-500'
    }
  ];

  const messages = [
    { id: 1, text: 'Hey, how are you doing?', sent: false, time: '2:28 PM' },
    { id: 2, text: 'I\'m doing great! How about you?', sent: true, time: '2:29 PM' },
    { id: 3, text: 'Pretty good, thanks for asking!', sent: false, time: '2:30 PM' }
  ];

  if (selectedChat) {
    const chat = chats.find(c => c.id === selectedChat);
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Chat Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center space-x-3">
          <button
            onClick={() => setSelectedChat(null)}
            className="text-blue-500 font-medium"
          >
            ← Back
          </button>
          <div className={`w-8 h-8 ${chat?.avatar} rounded-full flex items-center justify-center`}>
            <span className="text-white text-sm font-bold">
              {chat?.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="font-semibold text-gray-900">{chat?.name}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.sent
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sent ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="iMessage"
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Plus className="w-6 h-6 text-blue-500" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
          >
            <div className={`w-12 h-12 ${chat.avatar} rounded-full flex items-center justify-center mr-3`}>
              <span className="text-white font-bold">
                {chat.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                <span className="text-sm text-gray-500">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}