import React, { useRef, useEffect, useState } from "react";

export default function ChatWindow({ chat, onSend }) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (chat?.user.isOnline && Math.random() > 0.7) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [chat?.user.isOnline]);

  const commonEmojis = ['😊', '😂', '❤️', '👍', '🎵', '🎸', '🔥', '✨', '🎉', '😭', '😍', '🤩'];

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white/5">
        <svg className="w-16 h-16 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-300 mb-2">Select a conversation</h3>
        <p className="text-sm text-gray-500">Choose a chat to start messaging your concert buddy</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-b from-white/5 to-white/10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4 bg-white/10 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={chat.user.profileImage}
              alt={chat.user.fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
            />
            {chat.user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-gray-800 rounded-full"></div>
            )}
          </div>
          <div className="ml-3">
            <div className="text-white font-bold text-lg">{chat.user.fullName}</div>
            <div className="text-gray-300 text-sm flex items-center">
              <span>{chat.user.city}, {chat.user.country}</span>
              {chat.user.isOnline && (
                <>
                  <span className="mx-2">•</span>
                  <span className="text-emerald-400">Online</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Concert Context */}
        <div className="hidden md:flex items-center bg-purple-500/20 px-3 py-2 rounded-lg border border-purple-500/30">
          <svg className="w-4 h-4 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-purple-300 text-sm font-medium">{chat.sharedConcert}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {chat.messages.map((msg, idx) => {
          const isMe = msg.fromMe;
          const showAvatar = !isMe && (idx === 0 || !chat.messages[idx - 1] || chat.messages[idx - 1].fromMe);
          
          return (
            <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {!isMe && (
                <div className="w-8 h-8 flex-shrink-0">
                  {showAvatar && (
                    <img
                      src={chat.user.profileImage}
                      alt={chat.user.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
              )}
              
              <div className={`group max-w-xs lg:max-w-md ${isMe ? 'order-1' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg ${
                    isMe
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-md"
                      : "bg-white/20 backdrop-blur-sm text-white border border-white/10 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-1 mt-1 px-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                  {isMe && (
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-end gap-2">
            <img
              src={chat.user.profileImage}
              alt={chat.user.fullName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-md border border-white/10">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 bg-white/10 backdrop-blur-sm flex-shrink-0">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="p-4 border-b border-white/10">
            <div className="grid grid-cols-6 gap-2 max-w-xs">
              {commonEmojis.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => addEmoji(emoji)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <form
          className="flex items-end gap-2 p-4"
          onSubmit={e => {
            e.preventDefault();
            if (message.trim()) {
              onSend(message);
              setMessage("");
            }
          }}
        >
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Input */}
          <div className="flex-1">
            <input
              className="w-full px-4 py-3 rounded-2xl bg-white/10 text-white border border-white/20 focus:outline-none focus:border-emerald-500/50 placeholder-gray-400 resize-none"
              placeholder={`Message ${chat.user.fullName}...`}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (message.trim()) {
                    onSend(message);
                    setMessage("");
                  }
                }
              }}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim()}
            className={`p-3 rounded-2xl font-medium transition-all duration-200 ${
              message.trim()
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}