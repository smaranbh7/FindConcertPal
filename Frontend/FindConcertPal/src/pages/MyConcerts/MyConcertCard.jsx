export default function MyConcertCard({ concert, onDelete }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group flex flex-col h-full">
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
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-3 leading-tight">
            {concert.title}
          </h3>
          <p className="text-gray-300 text-sm mb-5 line-clamp-2">{concert.artist}</p>

          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-start">
              <span className="w-4 h-4 mr-3 text-blue-400 mt-0.5">📅</span>
              <span className="line-clamp-2 leading-relaxed">
                {new Date(concert.date).toLocaleDateString()} at {concert.time}
              </span>
            </div>
            <div className="flex items-start">
              <span className="w-4 h-4 mr-3 text-purple-400 mt-0.5">📍</span>
              <span className="line-clamp-2 leading-relaxed">
                {concert.venue}, {concert.city}
              </span>
            </div>

            <div className="flex items-start">
              <span className="w-4 h-4 mr-3 text-emerald-400 mt-0.5">👥</span>
              <span className="line-clamp-2 leading-relaxed">{concert.attendees || "0"} people availabe for matching</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4">
          <button
            onClick={() => onDelete(concert.concertId)}
            className="w-full px-4 py-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg text-red-300 hover:bg-red-500/30 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm transition-all font-medium flex items-center justify-center space-x-2"
          >
            <span>🗑️</span>
            <span>Remove Concert</span>
          </button>
        </div>
      </div>
    </div>
  );
} 