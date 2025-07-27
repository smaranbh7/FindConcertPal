import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import ConnectionCard from "./ConnectionCard";
import { useDispatch, useSelector } from "react-redux";
import { getMatchRequest } from "../../redux/findMatches/Action";

export default function ConnectionRequests() {
  const dispatch = useDispatch();
  const { findMatches } = useSelector((store)=>store);

  useEffect(()=>{
    dispatch(getMatchRequest());
  }, [dispatch])

  console.log(findMatches.incomingMatchingRequests)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="text-center">
              <h1 className="text-4xl font-black mb-4 text-white flex items-center justify-center">
                Connection Requests
                <span className="text-2xl ml-3 animate-bounce">🤝</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                People who want to connect with you for upcoming concerts. Accept requests to build your concert crew!
              </p>
              
              {/* Stats */}
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 min-w-[120px]">
                  <div className="text-2xl font-bold text-yellow-400">{findMatches.incomingMatchingRequests.length}</div>
                  <div className="text-gray-300 text-sm">Pending Requests</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              People Want to Connect With You
            </h2>
            {findMatches.incomingMatchingRequests.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {findMatches.incomingMatchingRequests.map((request) => (
                  <ConnectionCard 
                    key={request.id} 
                    request={request}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-white mb-2">No pending requests</h3>
                <p className="text-gray-300">When people want to connect with you, they'll appear here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 