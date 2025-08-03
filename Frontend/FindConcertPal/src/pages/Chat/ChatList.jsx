import React, { useState } from "react";

export default function ChatList({ chats, selectedChatId, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter(chat =>
    chat.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.sharedConcert.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 min-w-[320px] border-r border-white/10 bg-white/5 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white mb-3">Messages</h2>
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-emerald-500/50"
          />
          <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`flex items-center p-3 cursor-pointer hover:bg-white/10 transition-all duration-200 border-b border-white/5 ${
              selectedChatId === chat.id ? "bg-emerald-500/20 border-l-4 border-l-emerald-500" : ""
            }`}
          >
            {/* Profile Image with Online Status */}
            <div className="relative mr-3 flex-shrink-0">
              <img
                src={chat.user.profileImage}
                alt={chat.user.fullName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/10"
              />
              {chat.user.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-gray-800 rounded-full"></div>
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 overflow-hidden">
              {/* Name and Badge Row */}
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-medium text-sm truncate pr-2">
                  {chat.user.fullName}
                </h3>
                {chat.unreadCount > 0 && (
                  <div className="bg-emerald-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 flex-shrink-0">
                    {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                  </div>
                )}
              </div>
              
              {/* Time Row */}
              <div className="mb-1">
                <span className="text-gray-400 text-xs">{chat.lastMessageTime}</span>
              </div>

              {/* Concert Row */}
              <div className="flex items-center mb-1">
                <svg className="w-3 h-3 text-purple-400 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
                </svg>
                <span className="text-purple-300 text-xs truncate">{chat.sharedConcert}</span>
              </div>

              {/* Last Message Row */}
              <p className="text-gray-400 text-xs truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-gray-400">
            <svg className="w-12 h-12 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-sm">No chats found</p>
          </div>
        )}
      </div>
    </div>
  );
}