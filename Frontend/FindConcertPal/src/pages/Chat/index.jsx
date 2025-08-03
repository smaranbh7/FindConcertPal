import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

// Mock data
const mockChats = [
  {
    id: 1,
    user: {
      fullName: "Sarah Johnson",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=400",
      city: "San Francisco",
      country: "CA",
      isOnline: true
    },
    lastMessage: "Perfect! Can't wait to experience it together 🎵",
    lastMessageTime: "2 min",
    unreadCount: 2,
    sharedConcert: "Taylor Swift - Eras Tour",
    messages: [
      { text: "Hey Sarah! I saw we're both going to Taylor Swift!", fromMe: true, time: "2:15 PM", timestamp: new Date(Date.now() - 3600000) },
      { text: "OMG yes! I'm so excited! Are you going alone?", fromMe: false, time: "2:16 PM", timestamp: new Date(Date.now() - 3540000) },
      { text: "Yeah, my friend bailed last minute 😭", fromMe: true, time: "2:17 PM", timestamp: new Date(Date.now() - 3480000) },
      { text: "Same here! We should definitely meet up before the show", fromMe: false, time: "2:18 PM", timestamp: new Date(Date.now() - 3420000) },
      { text: "That would be amazing! I have floor seats, section A", fromMe: true, time: "2:20 PM", timestamp: new Date(Date.now() - 3300000) },
      { text: "No way, I'm in section B! We're literally next to each other", fromMe: false, time: "2:21 PM", timestamp: new Date(Date.now() - 3240000) },
      { text: "This is perfect! Want to grab dinner before too?", fromMe: true, time: "2:25 PM", timestamp: new Date(Date.now() - 3000000) },
      { text: "Perfect! Can't wait to experience it together 🎵", fromMe: false, time: "2:26 PM", timestamp: new Date(Date.now() - 120000) }
    ]
  },
  {
    id: 2,
    user: {
      fullName: "Mike Chen",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      city: "San Jose",
      country: "CA",
      isOnline: false
    },
    lastMessage: "Sounds good! I'll be wearing a red jacket",
    lastMessageTime: "1h",
    unreadCount: 0,
    sharedConcert: "The Weeknd - After Hours",
    messages: [
      { text: "Hey Mike! Ready for The Weeknd tonight?", fromMe: true, time: "1:00 PM", timestamp: new Date(Date.now() - 7200000) },
      { text: "Absolutely! This is going to be insane 🔥", fromMe: false, time: "1:05 PM", timestamp: new Date(Date.now() - 6900000) },
      { text: "I'm planning to get there around 7 PM for the opening act", fromMe: true, time: "1:10 PM", timestamp: new Date(Date.now() - 6600000) },
      { text: "Great idea! Let's meet at the main entrance around 6:45?", fromMe: false, time: "1:15 PM", timestamp: new Date(Date.now() - 6300000) },
      { text: "Perfect! How will I recognize you in the crowd?", fromMe: true, time: "1:20 PM", timestamp: new Date(Date.now() - 6000000) },
      { text: "Sounds good! I'll be wearing a red jacket", fromMe: false, time: "1:25 PM", timestamp: new Date(Date.now() - 5700000) }
    ]
  },
  {
    id: 3,
    user: {
      fullName: "Emma Rodriguez",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      city: "Oakland",
      country: "CA",
      isOnline: true
    },
    lastMessage: "I have an extra poster if you want it!",
    lastMessageTime: "15 min",
    unreadCount: 1,
    sharedConcert: "Billie Eilish - Happier Than Ever",
    messages: [
      { text: "Emma! Thanks for connecting on FindConcertPal", fromMe: true, time: "12:30 PM", timestamp: new Date(Date.now() - 9000000) },
      { text: "Of course! Fellow Billie fan 💚", fromMe: false, time: "12:32 PM", timestamp: new Date(Date.now() - 8880000) },
      { text: "I saw you've been to 3 of her shows already! Any tips?", fromMe: true, time: "12:35 PM", timestamp: new Date(Date.now() - 8700000) },
      { text: "She usually does 2 encores, so don't leave early!", fromMe: false, time: "12:40 PM", timestamp: new Date(Date.now() - 8400000) },
      { text: "Good to know! Are you collecting merch from this tour?", fromMe: true, time: "12:45 PM", timestamp: new Date(Date.now() - 8100000) },
      { text: "Always! I have an extra poster if you want it!", fromMe: false, time: "12:50 PM", timestamp: new Date(Date.now() - 900000) }
    ]
  },
  {
    id: 4,
    user: {
      fullName: "Alex Thompson",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      city: "Berkeley",
      country: "CA",
      isOnline: false
    },
    lastMessage: "Thanks for the recommendation!",
    lastMessageTime: "3h",
    unreadCount: 0,
    sharedConcert: "Arctic Monkeys - The Car Tour",
    messages: [
      { text: "Alex! Ready for Arctic Monkeys tomorrow?", fromMe: true, time: "10:00 AM", timestamp: new Date(Date.now() - 18000000) },
      { text: "Can't wait! First time seeing them live", fromMe: false, time: "10:05 AM", timestamp: new Date(Date.now() - 17700000) },
      { text: "You're in for a treat! They're incredible live", fromMe: true, time: "10:10 AM", timestamp: new Date(Date.now() - 17400000) },
      { text: "Any song recommendations I should listen to before?", fromMe: false, time: "10:15 AM", timestamp: new Date(Date.now() - 17100000) },
      { text: "Definitely R U Mine and Do I Wanna Know - crowd favorites!", fromMe: true, time: "10:20 AM", timestamp: new Date(Date.now() - 16800000) },
      { text: "Thanks for the recommendation!", fromMe: false, time: "10:25 AM", timestamp: new Date(Date.now() - 10800000) }
    ]
  },
  {
    id: 5,
    user: {
      fullName: "Jessica Wu",
      profileImage: "https://images.unsplash.com/photo-1488508872907-592763824245?w=400",
      city: "Palo Alto",
      country: "CA",
      isOnline: true
    },
    lastMessage: "See you at 8! 🎸",
    lastMessageTime: "30 min",
    unreadCount: 0,
    sharedConcert: "John Mayer - Sob Rock Tour",
    messages: [
      { text: "Jessica! Are you heading to John Mayer tonight?", fromMe: true, time: "7:00 PM", timestamp: new Date(Date.now() - 1800000) },
      { text: "Yes! Can't believe I finally got tickets", fromMe: false, time: "7:02 PM", timestamp: new Date(Date.now() - 1680000) },
      { text: "His guitar solos are unreal live. You'll love it!", fromMe: true, time: "7:05 PM", timestamp: new Date(Date.now() - 1500000) },
      { text: "I'm getting there early for merch. Meet up?", fromMe: false, time: "7:10 PM", timestamp: new Date(Date.now() - 1200000) },
      { text: "Absolutely! I'll be there around 8 PM", fromMe: true, time: "7:15 PM", timestamp: new Date(Date.now() - 900000) },
      { text: "See you at 8! 🎸", fromMe: false, time: "7:30 PM", timestamp: new Date(Date.now() - 1800000) }
    ]
  }
];

export default function Chat() {
  const [chats, setChats] = useState(mockChats);
  const [selectedChatId, setSelectedChatId] = useState(chats[0]?.id);

  const handleSend = (text) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { text, fromMe: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
              ],
              lastMessage: text
            }
          : chat
      )
    );
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 h-[calc(100vh-64px)] relative">
        {/* Mobile: Show list or chat, Desktop: Show both */}
        <div className={`${selectedChatId ? 'hidden md:flex' : 'flex'} transition-all duration-300`}>
          <ChatList
            chats={chats}
            selectedChatId={selectedChatId}
            onSelect={setSelectedChatId}
          />
        </div>
        
        <div className={`${selectedChatId ? 'flex' : 'hidden md:flex'} flex-1 min-w-0 transition-all duration-300`}>
          <ChatWindow 
            chat={selectedChat} 
            onSend={handleSend}
            onBack={() => setSelectedChatId(null)} // Add back functionality for mobile
          />
        </div>
        
        {/* Mobile Back Button */}
        {selectedChatId && (
          <button
            onClick={() => setSelectedChatId(null)}
            className="md:hidden fixed top-20 left-4 z-10 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}