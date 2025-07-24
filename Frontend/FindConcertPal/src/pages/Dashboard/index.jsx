import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import ConcertCard from "./ConcertCard";
import { fetchConcerts, addConcertToGoing, removeConcertStatus } from "../../redux/concert/Action";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { auth, concert } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchConcerts());
  }, [dispatch]);

  const handleStatusChange = (concertId, newStatus) => {
    console.log("handleStatusChange called with:", { concertId, newStatus });
    if (newStatus === 'going') {
      dispatch(addConcertToGoing(concertId));
    } else {
      // Remove status (newStatus is null or empty)
      dispatch(removeConcertStatus(concertId));
    }
  };

  // Calculate user stats
  const userStats = {
    going: concert.concerts.filter((c) => c.userStatus === "going").length,
    total: concert.concerts.length,
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
                  Concerts tailored for:{" "}
                  <span className="font-bold text-blue-400">
                    {auth.user?.city && auth.user?.state &&auth.user?.genres
                      ? `${auth.user.genres}  in ${auth.user.city}, ${auth.user.state}`
                      : "Your Location"}
                  </span>
                </p>
                <p className="text-gray-400 text-sm">
                  Find your next amazing live music experience and connect with
                  fellow music lovers
                </p>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center min-w-[120px] hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-white">
                    {userStats.total}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    Available
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center min-w-[120px] hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-emerald-400">
                    {userStats.going}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">Going</div>
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
              {concert.concerts.map((concertItem, index) => (
                <ConcertCard 
                  key={concertItem.id || concertItem.concertId || concertItem._id || index} 
                  concert={concertItem} 
                  onStatusChange={handleStatusChange}
                />
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
