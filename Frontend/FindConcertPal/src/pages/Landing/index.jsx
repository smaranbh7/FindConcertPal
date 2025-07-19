import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate ();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#2d1b69] to-[#8b5cf6] relative overflow-hidden">
      {/* Floating music notes animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-white/20 text-3xl animate-pulse">♪</div>
        <div className="absolute top-40 right-20 text-white/20 text-2xl animate-bounce delay-1000">♫</div>
        <div className="absolute bottom-40 left-1/4 text-white/20 text-4xl animate-pulse delay-500">♬</div>
        <div className="absolute top-60 left-1/2 text-white/20 text-2xl animate-bounce delay-700">♩</div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-12">
        <div className="max-w-4xl w-full text-center">
          {/* Header */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <span className="text-6xl md:text-7xl animate-pulse">🎤</span>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 mb-6 leading-tight">
            Find Your
            <br />
            <span className="text-yellow-300">Concert Buddy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Stop going to concerts alone! Connect with fellow music lovers, discover your concert twin, and turn every show into an unforgettable shared experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={()=>navigate("/signin")}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white/20">
                🎸 Start Finding Buddies
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold text-lg rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                Sign In
              </button>
          </div>

          {/* How It Works */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Match by Music Taste</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Our smart algorithm matches you with people who love the same artists, genres, and vibes you do.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-white mb-3">Chat & Plan Together</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Message your matches, plan meetups, share travel costs, and coordinate your concert experience.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-white mb-3">Experience Together</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Attend concerts with your new friends, create memories, and build lasting connections through music.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Join 10,000+ Concert Buddies</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="text-left">
                  <p className="text-white/90 italic mb-2">
                    "Found my concert crew through FindConcertPal! We've been to 15 shows together this year. Best decision ever!"
                  </p>
                  <p className="text-pink-300 font-semibold">— Alex, 24, San Francisco</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="text-left">
                  <p className="text-white/90 italic mb-2">
                    "As someone new to the city, this app helped me find friends who share my love for indie rock. Game changer!"
                  </p>
                  <p className="text-blue-300 font-semibold">— Sarah, 28, Austin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-300 mb-2">10K+</div>
              <div className="text-white/80 font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-pink-300 mb-2">50K+</div>
              <div className="text-white/80 font-medium">Connections Made</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-300 mb-2">1M+</div>
              <div className="text-white/80 font-medium">Concert Experiences</div>
            </div>
          </div>

          {/* Featured Concert Types */}
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Find Buddies for Any Genre</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['🎸 Rock', '🎵 Pop', '🎺 Jazz', '🎤 Hip Hop', '🎼 Classical', '🔊 EDM', '🎻 Country', '🎹 R&B'].map((genre) => (
                <span key={genre} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-200">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 