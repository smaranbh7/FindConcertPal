import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import MyConcertCard from "./MyConcertCard";
import { useEffect } from "react";
import { deleteMyConcerts, fetchMyConcerts } from "../../redux/myConcerts/Action";

export default function MyConcerts() {
  const dispatch = useDispatch();
  const { auth, myConcerts } = useSelector((store) => store);
  
  useEffect(()=>{
    dispatch(fetchMyConcerts());
  },[dispatch])



  const handleDelete = (concertId) => {
    dispatch(deleteMyConcerts(concertId));
    console.log(`Delete concert ${concertId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-pulse delay-500"></div>

        {/* Floating musical notes */}
        <div className="absolute top-20 right-20 text-blue-300 text-2xl animate-bounce delay-700 opacity-20">
          ♪
        </div>
        <div className="absolute top-1/2 left-20 text-emerald-300 text-xl animate-bounce delay-1000 opacity-20">
          ♫
        </div>
        <div className="absolute bottom-40 right-1/4 text-teal-300 text-3xl animate-bounce delay-300 opacity-20">
          ♬
        </div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Enhanced Page Header */}
        <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
            <div className="text-center">
              <h1 className="text-5xl font-black mb-4 flex items-center justify-center text-white">
                <span className="text-blue-400 text-4xl mr-4">🎤</span>
                My Concerts
                <span className="text-emerald-400 text-4xl ml-4">🎫</span>
              </h1>
              <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-8">
                All the amazing concerts you're going to attend
              </p>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-emerald-400">
                    {myConcerts.concerts.length}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">Concerts Going</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-blue-400">
                    {myConcerts.concerts.reduce((sum, concert) => sum + (concert.attendees || 0), 0)}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">Total Attendees</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-white">
                    {myConcerts.concerts.filter(c => new Date(c.date) > new Date()).length}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">Upcoming</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {/* Content Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                  <span className="text-emerald-400 mr-3">✓</span>
                  Concerts I'm Going To
                </h2>
                <p className="text-gray-300 text-lg">
                  You have {myConcerts.concerts.length} confirmed concerts coming up
                </p>
              </div>
              
              {/* Filter/Sort Options */}
              <div className="hidden md:flex items-center space-x-4">
                <select className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm">
                  <option value="date" className="bg-gray-800 text-white">Sort by Date</option>
                  <option value="artist" className="bg-gray-800 text-white">Sort by Artist</option>
                  <option value="venue" className="bg-gray-800 text-white">Sort by Venue</option>
                </select>
              </div>
            </div>
          </div>

          {/* Concert Grid */}
          {myConcerts.concerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {myConcerts.concerts.map((concert) => (
                <MyConcertCard
                  key={concert.id}
                  concert={concert}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-blue-400 text-8xl mb-6 animate-bounce">
                🎫
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No concerts confirmed yet
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                Start exploring concerts and mark the ones you want to attend!
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-xl">
                <span className="flex items-center space-x-2">
                  <span>🎵</span>
                  <span>Discover Concerts</span>
                </span>
              </button>
            </div>
          )}

          {/* Upcoming Events Timeline */}
          {myConcerts.concerts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="text-blue-400 mr-3">📅</span>
                Upcoming Timeline
              </h3>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="space-y-6">
                  {myConcerts.concerts
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((concert, index) => (
                    <div key={concert.id} className="flex items-center space-x-6 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="text-blue-400 text-2xl">
                        {index === 0 ? "🔥" : "🎵"}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold">{concert.title}</h4>
                        <p className="text-gray-300 text-sm">{concert.venue}, {concert.city}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">
                          {new Date(concert.date).toLocaleDateString()}
                        </div>
                        <div className="text-gray-300 text-sm">{concert.time}</div>
                      </div>
                      {index === 0 && (
                        <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full font-bold">
                          Up Next
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 