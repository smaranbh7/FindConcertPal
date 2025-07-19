import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { auth, concerts } = useSelector(store => store);

  // Mock concert data - you'll replace this with Redux data
  const mockConcerts = [
    {
      id: 1,
      title: "Taylor Swift - Eras Tour",
      artist: "Taylor Swift",
      venue: "MetLife Stadium",
      date: "2024-05-15",
      time: "19:30",
      location: "East Rutherford, NJ",
      genre: "Pop",
      price: "$150 - $350",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      attendees: 145,
      userStatus: null // null, 'going', 'interested'
    },
    {
      id: 2,
      title: "The Weeknd - After Hours",
      artist: "The Weeknd",
      venue: "Madison Square Garden",
      date: "2024-06-20",
      time: "20:00",
      location: "New York, NY",
      genre: "R&B",
      price: "$75 - $250",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop",
      attendees: 89,
      userStatus: null
    },
    {
      id: 3,
      title: "Imagine Dragons - Mercury Tour",
      artist: "Imagine Dragons",
      venue: "Barclays Center",
      date: "2024-07-10",
      time: "19:00",
      location: "Brooklyn, NY",
      genre: "Rock",
      price: "$60 - $180",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
      attendees: 67,
      userStatus: 'going'
    },
    {
      id: 4,
      title: "Billie Eilish - Happier Than Ever",
      artist: "Billie Eilish",
      venue: "Prudential Center",
      date: "2024-08-05",
      time: "19:30",
      location: "Newark, NJ",
      genre: "Alternative",
      price: "$85 - $220",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      attendees: 102,
      userStatus: 'interested'
    }
  ];

  useEffect(() => {
    // TODO: Dispatch action to fetch concerts
    // dispatch(fetchConcerts());
  }, [dispatch]);

  const handleStatusChange = (concertId, newStatus) => {
    // TODO: Dispatch Redux action to update concert status
    console.log(`Concert ${concertId}: ${newStatus}`);
  };

  const getStatusDisplay = (status) => {
    switch(status) {
      case 'going':
        return { text: '✓ Going', color: 'text-green-600' };
      case 'interested':
        return { text: '⭐ Interested', color: 'text-yellow-600' };
      default:
        return { text: 'Not Interested', color: 'text-gray-600' };
    }
  };

  // Calculate user stats
  const userStats = {
    going: mockConcerts.filter(c => c.userStatus === 'going').length,
    interested: mockConcerts.filter(c => c.userStatus === 'interested').length,
    total: mockConcerts.length
  };

  const ConcertCard = ({ concert }) => {
    const statusDisplay = getStatusDisplay(concert.userStatus);
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={concert.image} 
            alt={concert.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {concert.genre}
          </div>
          {concert.userStatus && (
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
              concert.userStatus === 'going' 
                ? 'bg-green-600 text-white' 
                : 'bg-yellow-600 text-white'
            }`}>
              {concert.userStatus === 'going' ? '✓ Going' : '⭐ Interested'}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{concert.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{concert.artist}</p>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">📅</span>
              <span>{new Date(concert.date).toLocaleDateString()} at {concert.time}</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">📍</span>
              <span>{concert.venue}, {concert.location}</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">💰</span>
              <span>{concert.price}</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">👥</span>
              <span>{concert.attendees} concert buddies interested</span>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status: <span className={statusDisplay.color}>{statusDisplay.text}</span>
            </label>
            <select
              value={concert.userStatus || ''}
              onChange={(e) => handleStatusChange(concert.id, e.target.value || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            >
              <option value="">Not Interested</option>
              <option value="interested">⭐ Interested</option>
              <option value="going">✓ Going</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Enhanced Page Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-white mb-6 md:mb-0">
              <h1 className="text-4xl font-bold mb-2">
                Discover Concerts
                <span className="text-2xl ml-2">🎵</span>
              </h1>
              <p className="text-indigo-100 text-lg max-w-lg">
                Concerts tailored for your location: <span className="font-semibold text-white">{auth.user?.location?.city || "Your City"}</span>
              </p>
              <p className="text-indigo-200 text-sm mt-1">
                Find your next amazing live music experience and connect with fellow music lovers
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-white">{userStats.total}</div>
                <div className="text-indigo-200 text-xs">Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-green-300">{userStats.going}</div>
                <div className="text-indigo-200 text-xs">Going</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-yellow-300">{userStats.interested}</div>
                <div className="text-indigo-200 text-xs">Interested</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">All Concerts</h2>
              <p className="text-gray-600">
                Showing {mockConcerts.length} concerts in your area
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
              <span>🔄 Updated 5 min ago</span>
            </div>
          </div>
        </div>

        {/* Concert Grid */}
        {mockConcerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockConcerts.map(concert => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎵</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No concerts found</h3>
            <p className="text-gray-600">Check back later for new concerts</p>
          </div>
        )}
      </div>
    </div>
  );
} 