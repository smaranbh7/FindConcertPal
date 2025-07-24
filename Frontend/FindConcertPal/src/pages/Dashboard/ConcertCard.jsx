import React from "react";

export default function ConcertCard({ concert, onStatusChange }) {
  const isGoing = concert.userStatus === "going";

  const handleGoingToggle = () => {
    console.log("Concert object:", concert);
    console.log("Concert ID being sent:", concert.id);
    console.log("All concert keys:", Object.keys(concert));
    
    // Try to get the correct ID field
    const concertId = concert.id || concert.concertId || concert._id || concert.ID;
    console.log("Using concert ID:", concertId);
    
    // Toggle going status
    onStatusChange(concertId, isGoing ? null : "going");
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col">
      <div className="relative flex-shrink-0">
        <img
          src={concert.imageUrl}
          alt={concert.title}
          className="w-full h-48 object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-3 right-3 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
          {concert.genre}
        </div>
        {isGoing && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20 bg-emerald-500/90 text-white">
            ✓ Going
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors line-clamp-2">
            {concert.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-1">{concert.artist}</p>

          <div className="space-y-3 text-sm text-gray-300 mb-6">
            <div className="flex items-center">
              <span className="w-4 h-4 mr-3 text-blue-400 flex-shrink-0">📅</span>
              <span className="truncate">
                {new Date(concert.date).toLocaleDateString()} at {concert.time}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-3 text-purple-400 flex-shrink-0">📍</span>
              <span className="truncate">
                {concert.venue}, {concert.city}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-4 h-4 mr-3 text-emerald-400 flex-shrink-0">👥</span>
              <span className="truncate">{concert.attendees || "0"} people interested</span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleGoingToggle}
            disabled={concert.loading}
            className={`w-full px-4 py-3 rounded-lg font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-12 flex items-center justify-center ${
              isGoing
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
            }`}
          >
            {concert.loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : isGoing ? (
              "✓ Going"
            ) : (
              "Going"
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 