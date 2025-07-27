import React from "react";
import { useDispatch } from "react-redux";
import { acceptMatchRequest, deleteMatchRequest } from "../../redux/findMatches/Action";

export default function ConnectionCard({ request }) {
  const dispatch = useDispatch();
  const handleAccept = () => {
    console.log(`Accept request from ${request.fullName} (ID: ${request.id})`);
    dispatch(acceptMatchRequest(request.id));
  };
  
  const handleReject = () => {
    console.log(`Reject request from ${request.fullName} (ID: ${request.id})`);
    dispatch(deleteMatchRequest(request.id));
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <img
          src={'#'}
          alt={request.fullName}
          className="w-16 h-16 rounded-full border-4 border-white/20 shadow-lg object-cover"
        />
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                {request.fullName}, {request.age}
              </h3>
              <p className="text-gray-300 text-sm">
                {request.city}, {request.country}
              </p>
              <p className="text-gray-400 text-xs">
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="mb-3">
            <p className="text-gray-300 text-sm italic">
              "{request.message || "NO Request message Sent"}"
            </p>
          </div>

          {/* Genres */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {request.genres && request.genres.slice(0, 3).map((genre, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded"
                >
                  {genre}
                </span>
              ))}
              {request.genres && request.genres.length > 3 && (
                <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded">
                  +{request.genres.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium text-sm transition-colors duration-200 shadow-lg shadow-emerald-500/25"
            >
              ✓ Accept
            </button>
            <button
              onClick={handleReject}
              className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg font-medium text-sm transition-colors duration-200"
            >
              ✗ Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 