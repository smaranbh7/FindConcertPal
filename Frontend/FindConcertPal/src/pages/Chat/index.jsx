import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import websocketService from "../../services/websocketService";
import { getAcceptedMatches } from "../../redux/chat/Action";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { user } = useSelector(store => store.auth);
  const { acceptedMatches, loading } = useSelector(store => store.chat);
  const dispatch = useDispatch();

  // Fetch accepted matches when component mounts
  useEffect(() => {
    if (user?.id) {
      dispatch(getAcceptedMatches());
    }
  }, [dispatch, user?.id]);

  // Initialize WebSocket connection when component mounts
  useEffect(() => {
    if (user?.id) {
      websocketService.connect(user.id.toString())
        .then(() => {
          console.log('Connected to WebSocket from Chat component');
        })
        .catch(error => {
          console.error('Failed to connect to WebSocket:', error);
        });
    }

    return () => {
      // Cleanup WebSocket connection when component unmounts
      websocketService.disconnect();
    };
  }, [user?.id]);

  // Convert accepted matches to chat format
  useEffect(() => {
    if (acceptedMatches?.length > 0) {
      console.log('Accepted matches:', acceptedMatches);
      console.log('Current user ID:', user?.id);
      
      const convertedChats = acceptedMatches.map((match, index) => {
        // Use the actual user ID, not the match ID
        const chatUser = {
          id: match.id, // This should be the other user's ID from backend
          fullName: match.fullName,
          profileImage: match.profileImageUrl || "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=400",
          city: match.city,
          country: match.country || match.state,
          isOnline: Math.random() > 0.5 // Random online status for now
        };
        
        console.log('Chat user:', chatUser);
        
        return {
          id: `chat_${match.id}`, // Use a unique chat ID
          user: chatUser,
          lastMessage: "Start a conversation...",
          lastMessageTime: "now",
          unreadCount: 0,
          sharedConcert: match.concertId ? `Concert ${match.concertId}` : "Shared Interest",
          messages: [] // Start with empty messages
        };
      });
      
      setChats(convertedChats);
      
      // Set first chat as selected if none selected
      if (!selectedChatId && convertedChats.length > 0) {
        setSelectedChatId(convertedChats[0].id);
      }
    }
  }, [acceptedMatches, selectedChatId]);

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

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p>Loading your chats...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && acceptedMatches?.length === 0) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-white text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No Chat Partners Yet</h3>
            <p className="text-gray-400 mb-4">You don't have any accepted matches to chat with.</p>
            <p className="text-sm text-gray-500">Send match requests to other users and wait for them to accept!</p>
          </div>
        </div>
      </div>
    );
  }

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