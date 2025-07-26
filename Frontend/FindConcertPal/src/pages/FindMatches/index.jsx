import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MatchCard from "./MatchCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyConcerts } from "../../redux/myConcerts/Action";
import { getMatchingUsers } from "../../redux/findMatches/Action";

// Mock data for potential matches based on shared concerts
const mockMatches = [
  {
    id: 1,
    fullName: "Sarah Johnson",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=400",
    age: 25,
    location: "San Francisco, CA",
    bio: "Love live music! Usually go to concerts alone but would love some company. Always down to grab dinner before shows!",
    musicGenres: ["Indie Rock", "Electronic", "Alternative"],
    sharedConcerts: [
      { title: "Arctic Monkeys", date: "2024-02-15", venue: "Chase Center", status: "going" },
      { title: "The Weeknd", date: "2024-03-05", venue: "Oakland Arena", status: "going" },
      { title: "Billie Eilish", date: "2024-03-12", venue: "Bill Graham Civic", status: "going" }
    ],
    otherConcerts: ["ODESZA", "Tame Impala"],
    distance: "2.5 miles away",
    badges: ["Concert Regular", "Foodie"],
    goingAlone: true,
    lookingForGroup: true
  },
  {
    id: 2,
    fullName: "Mike Chen",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    age: 28,
    location: "San Francisco, CA",
    bio: "Concert enthusiast who's been going solo for years. Looking to meet cool people and share the experience!",
    musicGenres: ["Hip-Hop", "Jazz", "R&B"],
    sharedConcerts: [
      { title: "Taylor Swift", date: "2024-02-22", venue: "Levi's Stadium", status: "going" },
      { title: "Bad Bunny", date: "2024-03-20", venue: "Chase Center", status: "going" }
    ],
    otherConcerts: ["Kendrick Lamar", "Robert Glasper"],
    distance: "1.8 miles away",
    badges: ["Concert Veteran", "Early Bird"],
    goingAlone: true,
    lookingForGroup: true
  },
  {
    id: 3,
    fullName: "Emma Rodriguez",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    age: 23,
    location: "Oakland, CA",
    bio: "Solo concert goer looking for a squad! Love making new friends and singing along to every song 🎤",
    musicGenres: ["Pop Punk", "Metal", "Rock"],
    sharedConcerts: [
      { title: "Billie Eilish", date: "2024-03-12", venue: "Bill Graham Civic", status: "going" }
    ],
    otherConcerts: ["Paramore", "Fall Out Boy", "Olivia Rodrigo"],
    distance: "8.2 miles away",
    badges: ["Sing-Along Queen", "Social Butterfly"],
    goingAlone: true,
    lookingForGroup: true
  },
  {
    id: 4,
    fullName: "Alex Thompson",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    age: 30,
    location: "San Jose, CA",
    bio: "Usually attend concerts with friends but they're not into these artists. Open to meeting new concert buddies!",
    musicGenres: ["Classic Rock", "Blues", "Folk"],
    sharedConcerts: [
      { title: "Arctic Monkeys", date: "2024-02-15", venue: "Chase Center", status: "going" },
      { title: "The Weeknd", date: "2024-03-05", venue: "Oakland Arena", status: "going" }
    ],
    otherConcerts: ["The Rolling Stones", "Eagles"],
    distance: "15.3 miles away",
    badges: ["Music Explorer", "Weekend Warrior"],
    goingAlone: false,
    lookingForGroup: true
  },
  {
    id: 5,
    fullName: "Zoe Kim",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    age: 26,
    location: "Berkeley, CA",
    bio: "Love meeting people at concerts! Always looking to expand my concert crew. Let's vibe together! ✨",
    musicGenres: ["EDM", "House", "Techno"],
    sharedConcerts: [
      { title: "Taylor Swift", date: "2024-02-22", venue: "Levi's Stadium", status: "going" },
      { title: "Billie Eilish", date: "2024-03-12", venue: "Bill Graham Civic", status: "going" },
      { title: "Bad Bunny", date: "2024-03-20", venue: "Chase Center", status: "going" }
    ],
    otherConcerts: ["Deadmau5", "Above & Beyond"],
    distance: "6.7 miles away",
    badges: ["Concert Connector", "Vibe Master"],
    goingAlone: false,
    lookingForGroup: true
  },
  {
    id: 6,
    fullName: "Jordan Williams",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    age: 27,
    location: "San Francisco, CA",
    bio: "New to the city and don't know many people yet. Would love to make friends through our shared love of music!",
    musicGenres: ["Country", "Folk", "Americana"],
    sharedConcerts: [
      { title: "The Weeknd", date: "2024-03-05", venue: "Oakland Arena", status: "going" }
    ],
    otherConcerts: ["Chris Stapleton", "Kacey Musgraves"],
    distance: "3.1 miles away",
    badges: ["New in Town", "Friendly Vibes"],
    goingAlone: true,
    lookingForGroup: true
  }
];

export default function FindMatches() {
  const { myConcerts, findMatches  } = useSelector((store)=>store)
  const dispatch = useDispatch();

 useEffect(()=>{
  dispatch(fetchMyConcerts());
 }, [dispatch])

 useEffect(()=>{
  dispatch(getMatchingUsers());
 }, [dispatch])

  const [connectedCards, setConnectedCards] = useState(new Set());

  // Handle connection actions
  const handleConnect = (matchId, action) => {
    if (action === 'connect') {
      setConnectedCards(prev => new Set([...prev, matchId]));
      const match = mockMatches.find(m => m.id === matchId);
      console.log(`Connection request sent to ${match?.fullName}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-pulse delay-500"></div>

        {/* Floating elements */}
        <div className="absolute top-20 right-20 text-emerald-300 text-2xl animate-bounce delay-700 opacity-20">
          🤝
        </div>
        <div className="absolute top-1/2 left-20 text-blue-300 text-xl animate-bounce delay-1000 opacity-20">
          🎫
        </div>
        <div className="absolute bottom-40 right-1/4 text-purple-300 text-3xl animate-bounce delay-300 opacity-20">
          👥
        </div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="text-center">
              <h1 className="text-4xl font-black mb-4 text-white flex items-center justify-center">
                Find Concert Buddies
                <span className="text-2xl ml-3 animate-bounce">🎪</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                Connect with people going to the same concerts as you! 
                No more going alone - find your concert crew and make new friends.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center space-x-8 text-center">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 min-w-[120px]">
                  <div className="text-2xl font-bold text-white">{findMatches.users.length}</div>
                  <div className="text-gray-300 text-sm">Concert Buddies Availabe</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Your Upcoming Concerts */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-3">🎵</span>
              Your Upcoming Concerts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {myConcerts.concerts.map(concert => (
                <div key={concert.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
                  <div className="text-white font-medium text-sm mb-1">{concert.title}</div>
                  <div className="text-gray-400 text-xs">{new Date(concert.date).toLocaleDateString()}</div>
                  <div className="text-gray-400 text-xs">{concert.venue}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Concert Buddies Grid */}
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
                <span className="mr-3">👥</span>
                Concert Buddies
              </h2>
              <p className="text-gray-300">
                Connect with people who share your musical interests and are attending the same concerts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {findMatches.users.map((match) => (
                <MatchCard key={match.id} match={match} onConnect={handleConnect} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 