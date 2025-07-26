import React from "react";

export default function MatchCard({ match, onSendConnectionRequest }) {
  const handleClick = () => {
    if (onSendConnectionRequest) {
      onSendConnectionRequest(match.id);
    }
  };

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-500/20"></div>
          <div className="absolute -bottom-8 left-4">
            <img
              src={match.profileImage}
              alt={match.fullName}
              className="w-16 h-16 rounded-full border-4 border-white/20 shadow-lg object-cover"
            />
          </div>
        </div>

        <div className="p-4 pt-10">
          {/* Basic Info */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white mb-1">
              {match.fullName}, {match.age}
            </h3>
            <p className="text-gray-300 text-sm">
              {`${match.city}, ${match.country}`}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {match.distance || '5 Miles '}
            </p>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              {match.bio || 'No bio yet'}
            </p>
          </div>

          {/* Concerts Attending
          <div className="mb-4">
            <h4 className="text-white font-medium text-sm mb-2">Concerts Attending</h4>
            <div className="space-y-2">
              {match.sharedConcerts.map((concert, index) => (
                <div key={index} className="text-gray-300 text-sm">
                  {concert.title}
                </div>
              ))}
            </div>
          </div> */}

          {/* Favorite Genres */}
          <div className="mb-4">
            <h4 className="text-white font-medium text-sm mb-2">Favorite Genres</h4>
            <div className="flex flex-wrap gap-1">
              {match.genres && match.genres.map((genre, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button
              onClick={handleClick}
              className="w-full px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
            >
              Send Connection Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 