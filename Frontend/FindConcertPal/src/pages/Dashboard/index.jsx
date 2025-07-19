import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { fetchConcerts } from "../../redux/concert/Action";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { auth, concert } = useSelector((store) => store);

  //Mock concert data - you'll replace this with Redux data
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
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      attendees: 145,
      userStatus: null, // null, 'going', 'interested'
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
      image:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop",
      attendees: 89,
      userStatus: null,
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
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
      attendees: 67,
      userStatus: "going",
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
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      attendees: 102,
      userStatus: "interested",
    },
  ];

  useEffect(() => {
    dispatch(fetchConcerts());
  }, [dispatch]);

  const handleStatusChange = (concertId, newStatus) => {
    // TODO: Dispatch Redux action to update concert status
    console.log(`Concert ${concertId}: ${newStatus}`);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "going":
        return { text: "✓ Going", color: "text-emerald-500" };
      case "interested":
        return { text: "⭐ Interested", color: "text-amber-500" };
      default:
        return { text: "Not Interested", color: "text-gray-400" };
    }
  };

  // Calculate user stats
  const userStats = {
    going: mockConcerts.filter((c) => c.userStatus === "going").length,
    interested: mockConcerts.filter((c) => c.userStatus === "interested")
      .length,
    total: mockConcerts.length,
  };

  const ConcertCard = ({ concert }) => {
    const statusDisplay = getStatusDisplay(concert.userStatus);

    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
        <div className="relative">
          <img
            src={concert.imageUrl}
            alt={concert.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-3 right-3 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
            {concert.genre}
          </div>
          {concert.userStatus && (
            <div
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20 ${
                concert.userStatus === "going"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-amber-500/90 text-white"
              }`}
            >
              {concert.userStatus === "going" ? "✓ Going" : "⭐ Interested"}
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
            {concert.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4">{concert.artist}</p>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center">
              <span className="w-4 h-4 mr-3 text-blue-400">📅</span>
              <span>
                {new Date(concert.date).toLocaleDateString()} at {concert.time}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-3 text-purple-400">📍</span>
              <span>
                {concert.venue}, {concert.location}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-4 h-4 mr-3 text-emerald-400">👥</span>
              <span>{concert.attendees || "0"} people interested</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-200 mb-3">
              Status:{" "}
              <span className={statusDisplay.color}>{statusDisplay.text}</span>
            </label>
            <select
              value={concert.userStatus || ""}
              onChange={(e) =>
                handleStatusChange(concert.id, e.target.value || null)
              }
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition-all"
            >
              <option value="" className="bg-gray-800 text-white">
                Not Interested
              </option>
              <option value="interested" className="bg-gray-800 text-white">
                ⭐ Interested
              </option>
              <option value="going" className="bg-gray-800 text-white">
                ✓ Going
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-pulse delay-500"></div>

        {/* Floating musical notes */}
        <div className="absolute top-20 right-20 text-blue-300 text-2xl animate-bounce delay-700 opacity-20">
          ♪
        </div>
        <div className="absolute top-1/2 left-20 text-purple-300 text-xl animate-bounce delay-1000 opacity-20">
          ♫
        </div>
        <div className="absolute bottom-40 right-1/4 text-amber-300 text-3xl animate-bounce delay-300 opacity-20">
          ♬
        </div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Enhanced Page Header */}
        <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="text-white mb-8 md:mb-0">
                <h1 className="text-5xl font-black mb-4 flex items-center">
                  Discover Concerts
                  <span className="text-3xl ml-3 animate-bounce">🎵</span>
                </h1>
                <p className="text-gray-300 text-xl max-w-lg mb-2">
                  Concerts tailored for your location:{" "}
                  <span className="font-bold text-blue-400">
                    {auth.user?.city && auth.user?.state
                      ? `${auth.user.city}, ${auth.user.state}`
                      : "Your Location"}
                  </span>
                </p>
                <p className="text-gray-400 text-sm">
                  Find your next amazing live music experience and connect with
                  fellow music lovers
                </p>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-3 gap-6 w-full md:w-auto">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center min-w-[100px] hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-white">
                    {userStats.total}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    Available
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center min-w-[100px] hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-emerald-400">
                    {userStats.going}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">Going</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center min-w-[100px] hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-amber-400">
                    {userStats.interested}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    Interested
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {/* Results Summary */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                  All Concerts
                  <span className="ml-3 text-purple-400">🎪</span>
                </h2>
                <p className="text-gray-300 text-lg">
                  Showing {concert.concerts.length} amazing concerts in your
                  area
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-400">
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  🔄 Updated 5 min ago
                </span>
              </div>
            </div>
          </div>

          {/* Concert Grid */}
          {concert.concerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {concert.concerts.map((concert) => (
                <ConcertCard key={concert.id} concert={concert} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-blue-400 text-8xl mb-6 animate-bounce">
                🎵
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No concerts found
              </h3>
              <p className="text-gray-300 text-lg">
                Check back later for new concerts in your area
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
