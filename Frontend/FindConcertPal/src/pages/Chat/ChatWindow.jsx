import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import websocketService from "../../services/websocketService";

export default function ChatWindow({ chat, onSend }) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isWebSocketReady, setIsWebSocketReady] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useSelector(store => store.auth);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat history when chat changes
  useEffect(() => {
    if (chat?.user?.id && user?.id) {
      
      // Fetch chat history from backend
      fetch(`http://localhost:8080/api/chat/history/${user.id}/${chat.user.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to load chat history');
      })
      .then(chatHistory => {
        
        // Convert database messages to UI format
        const convertedMessages = chatHistory.map(msg => ({
          text: msg.content,
          fromMe: msg.senderId === user.id.toString(),
          time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(convertedMessages);
      })
      .catch(error => {
        console.error('Error loading chat history:', error);
        // Initialize with empty messages if loading fails
        setMessages(chat?.messages || []);
      });
    } else {
      // Fallback to chat prop messages
      setMessages(chat?.messages || []);
    }
  }, [chat?.user?.id, user?.id]);

  // Connect to WebSocket when component mounts
  useEffect(() => {
    setIsWebSocketReady(false);
    
    if (user?.id) {
      websocketService.connect(user.id.toString())
        .then(() => {
          setIsWebSocketReady(true);
          
          // Register callback for incoming messages for this chat
          if (chat?.id) {
            websocketService.onMessage(chat.id, (incomingMessage) => {
              const newMessage = {
                text: incomingMessage.content,
                fromMe: incomingMessage.senderId === user?.id?.toString(),
                time: new Date(incomingMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                timestamp: new Date(incomingMessage.timestamp)
              };
              
              setMessages(prev => {
                // Check if this message already exists (avoid duplicates)
                const isDuplicate = prev.some(msg => 
                  msg.text === newMessage.text && 
                  Math.abs(new Date(msg.timestamp) - new Date(newMessage.timestamp)) < 1000
                );
                
                if (isDuplicate) {
                  return prev;
                }
                return [...prev, newMessage];
              });
            });
          }
        })
        .catch(error => {
          console.error('Failed to connect to WebSocket:', error);
          setIsWebSocketReady(false);
        });
    }

    return () => {
      // Cleanup callback when component unmounts or chat changes
      if (chat?.id) {
        websocketService.offMessage(chat.id);
      }
      setIsWebSocketReady(false);
    };
  }, [user?.id, chat?.id, chat?.user.id]);

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
          
          <span className="text-purple-300 text-sm font-medium">{"Connected for: "+chat.sharedConcert}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <p>No messages yet. Send the first message!</p>
          </div>
        )}
        {messages.map((msg, idx) => {
          const isMe = msg.fromMe;
          const showAvatar = !isMe && (idx === 0 || !messages[idx - 1] || messages[idx - 1].fromMe);
          
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
            if (message.trim() && chat?.user.id && user?.id) {
              if (!isWebSocketReady) {
                return;
              }
              
              try {
                
                // Send via WebSocket
                const sentMessage = websocketService.sendMessage(chat.user.id.toString(), message.trim());
                
                // Add to local messages immediately
                const newMessage = {
                  text: message.trim(),
                  fromMe: true,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  timestamp: new Date()
                };
                setMessages(prev => [...prev, newMessage]);
                
                // Also call onSend if provided (for compatibility)
                if (onSend) {
                  onSend(message);
                }
                
                setMessage("");
              } catch (error) {
                console.error('Failed to send message:', error);
                // Fallback to onSend if WebSocket fails
                if (onSend) {
                  onSend(message);
                  setMessage("");
                }
              }
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
                  if (message.trim() && chat?.user.id && user?.id) {
                    if (!isWebSocketReady) {
                      console.warn('WebSocket not ready yet, please wait...');
                      return;
                    }
                    
                    try { 
                      // Send via WebSocket
                      const sentMessage = websocketService.sendMessage(chat.user.id.toString(), message.trim());
                      
                      // Add to local messages immediately
                      const newMessage = {
                        text: message.trim(),
                        fromMe: true,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        timestamp: new Date()
                      };
                      setMessages(prev => [...prev, newMessage]);
                      
                      // Also call onSend if provided (for compatibility)
                      if (onSend) {
                        onSend(message);
                      }
                      
                      setMessage("");
                    } catch (error) {
                      console.error('Failed to send message:', error);
                      // Fallback to onSend if WebSocket fails
                      if (onSend) {
                        onSend(message);
                        setMessage("");
                      }
                    }
                  }
                }
              }}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || !isWebSocketReady}
            className={`p-3 rounded-2xl font-medium transition-all duration-200 ${
              message.trim() && isWebSocketReady
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