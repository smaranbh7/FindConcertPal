import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MatchCard from "./MatchCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyConcerts } from "../../redux/myConcerts/Action";
import { getMatchingUsers, sendMatchRequest } from "../../redux/findMatches/Action";

export default function FindMatches() {
  const { myConcerts, findMatches } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyConcerts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMatchingUsers());
  }, [dispatch]);

  const handleSendConnectionRequest = (receiverId) => {
    console.log(`Sending connection request to user ID: ${receiverId}`);
    dispatch(sendMatchRequest(receiverId))
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
                  <div className="text-2xl font-bold text-white">{findMatches.users?.length || 0}</div>
                  <div className="text-gray-300 text-sm">Concert Buddies Available</div>
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
              {myConcerts.concerts?.map(concert => (
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
              {findMatches.users?.map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  onSendConnectionRequest={handleSendConnectionRequest}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 