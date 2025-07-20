import React from "react";

export default function ConcertCard({ concert, onStatusChange }) {
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
              {concert.venue}, {concert.city}
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
            <span className={statusDisplay.color}>
              {concert.loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                statusDisplay.text
              )}
            </span>
          </label>
          <select
            value={concert.userStatus || ""}
            onChange={(e) => {
              console.log("Concert object:", concert);
              console.log("Concert ID being sent:", concert.id);
              console.log("All concert keys:", Object.keys(concert));
              
              // Try to get the correct ID field
              const concertId = concert.id || concert.concertId || concert._id || concert.ID;
              console.log("Using concert ID:", concertId);
              
              onStatusChange(concertId, e.target.value || null)
            }}
            disabled={concert.loading}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
} 