"use client";

import { useState, useEffect } from "react";
import { Send, Search, Plus } from "lucide-react";
import QuickActionButton from "../QuickActionButton";

export default function MessagesApp() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const chats = [
    {
      id: 1,
      name: "Mom",
      lastMessage: "Thanks sweetie! You're the best tech support ever 😘",
      time: "2:30 PM",
      unread: 2,
      avatar: "bg-pink-500",
    },
    {
      id: 2,
      name: "Alex (Melodify)",
      lastMessage: "Perfect! Let's schedule a call to discuss the details 🎵",
      time: "1:15 PM",
      unread: 0,
      avatar: "bg-purple-500",
    },
  ];

  const messages = {
    1: [
      // Mom's conversation
      {
        id: 1,
        text: "Hey sweetie! My computer is acting weird again 😅",
        sent: false,
        time: "2:15 PM",
      },
      {
        id: 2,
        text: "Oh no, what's happening this time? 😄",
        sent: true,
        time: "2:16 PM",
      },
      {
        id: 3,
        text: "It keeps making this weird noise and the screen is all blue!",
        sent: false,
        time: "2:16 PM",
      },
      {
        id: 4,
        text: "The blue screen of death? 😱",
        sent: true,
        time: "2:17 PM",
      },
      {
        id: 5,
        text: "Yes! It's like it's possessed or something! 👻",
        sent: false,
        time: "2:17 PM",
      },
      {
        id: 6,
        text: "Haha, it's not possessed Mom. It's probably just Windows being Windows 😅",
        sent: true,
        time: "2:18 PM",
      },
      {
        id: 7,
        text: "Can you come over and fix it? I'll make your favorite cookies! 🍪",
        sent: false,
        time: "2:18 PM",
      },
      {
        id: 8,
        text: "You know I can't resist your cookies! 🥰",
        sent: true,
        time: "2:19 PM",
      },
      {
        id: 9,
        text: "I'll be there in an hour. Just don't touch anything until I get there!",
        sent: true,
        time: "2:19 PM",
      },
      {
        id: 10,
        text: "But I already tried turning it off and on again! 🔄",
        sent: false,
        time: "2:20 PM",
      },
      {
        id: 11,
        text: "Mom! 😅 That's like rule #1 of tech support!",
        sent: true,
        time: "2:20 PM",
      },
      {
        id: 12,
        text: "I also tried blowing on it like we used to do with the Nintendo cartridges! 🎮",
        sent: false,
        time: "2:21 PM",
      },
      {
        id: 13,
        text: "Oh my god Mom, that's not going to work on a laptop! 😂",
        sent: true,
        time: "2:21 PM",
      },
      {
        id: 14,
        text: "Well it worked back in the day! You kids and your fancy technology...",
        sent: false,
        time: "2:22 PM",
      },
      {
        id: 15,
        text: "Just leave it alone, I'll be there soon!",
        sent: true,
        time: "2:22 PM",
      },
      {
        id: 16,
        text: "Okay okay! I'll make the cookies while I wait 🍪",
        sent: false,
        time: "2:23 PM",
      },
      {
        id: 17,
        text: "And maybe I'll try one more thing...",
        sent: false,
        time: "2:23 PM",
      },
      { id: 18, text: "MOM! NO! 😱", sent: true, time: "2:24 PM" },
      {
        id: 19,
        text: "Too late! I just unplugged everything and plugged it back in! 🔌",
        sent: false,
        time: "2:24 PM",
      },
      {
        id: 20,
        text: "Thanks sweetie! You're the best tech support ever 😘",
        sent: false,
        time: "2:30 PM",
      },
    ],
    2: [
      // Client conversation
      {
        id: 1,
        text: "Hi! I'm Alex from Melodify. I saw your work on NextJS and I'm really impressed!",
        sent: false,
        time: "1:00 PM",
      },
      {
        id: 2,
        text: "Hi Alex! Thanks for reaching out. I'd love to hear more about Melodify!",
        sent: true,
        time: "1:01 PM",
      },
      {
        id: 3,
        text: "We're building a music collaboration platform for artists. Think GitHub, but for music producers!",
        sent: false,
        time: "1:02 PM",
      },
      {
        id: 4,
        text: "That sounds fascinating! I love the GitHub analogy - it makes perfect sense for version control in music production.",
        sent: true,
        time: "1:03 PM",
      },
      {
        id: 5,
        text: "Exactly! We need someone who understands both tech and product. Your portfolio shows you really care about user experience.",
        sent: false,
        time: "1:04 PM",
      },
      {
        id: 6,
        text: "I do! I believe great products come from understanding user needs first. What features are you looking to build?",
        sent: true,
        time: "1:05 PM",
      },
      {
        id: 7,
        text: "We want to add real-time collaboration, like Google Docs but for music tracks. Artists could work together remotely.",
        sent: false,
        time: "1:06 PM",
      },
      {
        id: 8,
        text: "That's ambitious! I've worked with WebSocket and real-time features before. We could use NextJS with Socket.io for that.",
        sent: true,
        time: "1:07 PM",
      },
      {
        id: 9,
        text: "Perfect! We also need a robust version control system for audio files. Any thoughts on that?",
        sent: false,
        time: "1:08 PM",
      },
      {
        id: 10,
        text: "We could implement a Git-like system for audio, storing diffs of changes. It would be challenging but really valuable for artists.",
        sent: true,
        time: "1:09 PM",
      },
      {
        id: 11,
        text: "You're speaking my language! We need someone who thinks about the product holistically.",
        sent: false,
        time: "1:10 PM",
      },
      {
        id: 12,
        text: "I'd love to help build this. The idea of making music collaboration more accessible is really exciting.",
        sent: true,
        time: "1:11 PM",
      },
      {
        id: 13,
        text: "We're a small team but passionate about music and tech. Your experience with NextJS would be perfect for our stack.",
        sent: false,
        time: "1:12 PM",
      },
      {
        id: 14,
        text: "I've built several production apps with NextJS. The performance and developer experience are unmatched.",
        sent: true,
        time: "1:13 PM",
      },
      {
        id: 15,
        text: "That's exactly what we need! We want to move fast but build something that scales.",
        sent: false,
        time: "1:14 PM",
      },
      {
        id: 16,
        text: "I can help with that. I've implemented features like real-time updates and file versioning before.",
        sent: true,
        time: "1:14 PM",
      },
      {
        id: 17,
        text: "Would you be interested in joining us? We're looking for someone who can lead the frontend development.",
        sent: false,
        time: "1:15 PM",
      },
      {
        id: 18,
        text: "I'd love to discuss this further! The project sounds really innovative.",
        sent: true,
        time: "1:15 PM",
      },
      {
        id: 19,
        text: "Perfect! Let's schedule a call to discuss the details 🎵",
        sent: false,
        time: "1:15 PM",
      },
    ],
  };

  const showToast = () => {
    setToastOpen(true);
    // setTimeout(() => setToastOpen(false), 3000);
  };

  const handleNewMessage = () => {
    showToast();
  };

  if (selectedChat) {
    const chat = chats.find((c) => c.id === selectedChat);
    return (
      <div className="relative flex flex-col h-full min-h-0 bg-white">
        {/* Gradient Blur at Top */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-32">
          <div
            className="w-full h-full bg-transparent"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maskImage: "linear-gradient(black, black, transparent)",
              WebkitMaskImage: "linear-gradient(black, black, transparent)",
            }}
          />
        </div>

        {/* Floating Back Button */}
        <QuickActionButton
          onClick={() => setSelectedChat(null)}
          className="absolute top-20 left-4 z-30 cursor-pointer"
          icon={
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          }
          darkTint
          aria-label="Back"
        />

        {/* Floating Avatar */}
        <div className="absolute top-16 left-1/2 z-30 transform -translate-x-1/2">
          <div
            className={`w-16 h-16 ${chat?.avatar} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}
          >
            <span className="text-white text-3xl font-bold">
              {chat?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 pb-28 pt-28 space-y-3">
          {messages[selectedChat as keyof typeof messages].map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sent ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm ${
                  message.sent
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sent ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input - iOS style */}
        <div className="absolute left-0 right-0 bottom-0 border-t border-gray-200 px-3 py-3 bg-white">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
              <Plus className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="iMessage"
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-base focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path
                  d="M12 18v-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M15 9l-3-3-3 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 bg-white">
      {/* Header */}
      <div className="bg-white p-4 pt-12 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <button
            onClick={handleNewMessage}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
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
            <div
              className={`w-12 h-12 ${chat.avatar} rounded-full flex items-center justify-center mr-3`}
            >
              <span className="text-white font-bold">
                {chat.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 truncate">
                  {chat.name}
                </h3>
                <span className="text-sm text-gray-500">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
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

      {/* Custom Toast */}
      {toastOpen && (
        <div
          className="fixed inset-0 z-[99999] pointer-events-auto"
          onClick={() => setToastOpen(false)}
        >
          {/* Invisible Backdrop */}
          <div className="absolute inset-0 bg-black/10" />
          <div
            className="absolute left-1/2 flex flex-col items-center justify-center pointer-events-auto"
            style={{
              top: "40%",
              transform: "translate(-50%, 0)",
              minWidth: 260,
              height: 160,
              background: "rgba(255,255,255,0.9)",
              borderRadius: "1rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              padding: "1.5rem",
              backdropFilter: "blur(8px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-lg font-semibold text-gray-900">
              Want to work with me?
            </span>
            <span className="text-gray-700 text-sm text-center">
              Send me an email at{" "}
              <span className="font-medium">hello@example.com</span>
            </span>
            <button
              className="mt-2 px-4 py-1.5 rounded-full bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition-colors"
              onClick={() => {
                window.open("mailto:hello@example.com", "_blank");
                setToastOpen(false);
              }}
            >
              Send Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
