
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        
        {/* Floating musical notes */}
        <div className="absolute top-20 left-20 text-emerald-400 text-3xl animate-bounce delay-700">♪</div>
        <div className="absolute top-40 right-32 text-cyan-400 text-2xl animate-bounce delay-1000">♫</div>
        <div className="absolute bottom-60 left-1/4 text-teal-400 text-4xl animate-bounce delay-300">♬</div>
        <div className="absolute top-60 right-1/4 text-emerald-400 text-2xl animate-bounce delay-1500">♩</div>
      </div>

      {/* Hero Section with Unique Colors */}
      <div className="relative bg-gradient-to-br from-slate-800 via-emerald-800 to-teal-700">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <span className="text-8xl animate-bounce">🎵</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
              <span className="inline-block hover:scale-110 transition-transform duration-300">Find</span>{" "}
              <span className="inline-block hover:scale-110 transition-transform duration-300">Your</span>
              <br />
              <span className="text-amber-300 inline-block hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                Concert Buddy
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-emerald-100 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              Stop going to concerts <span className="text-amber-300 font-semibold">alone!</span> Connect with fellow music lovers and turn every show into an{" "}
              <span className="text-cyan-300 font-semibold">unforgettable experience</span>
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <button 
                onClick={() => navigate("/signup")}
                className="group px-10 py-5 bg-white text-emerald-700 font-bold text-xl rounded-2xl shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-300 border-2 border-white transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>🎸</span>
                  <span>Start Finding Buddies</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              <button 
                onClick={() => navigate("/login")}
                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-semibold text-xl rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:-translate-y-1"
              >
                Sign In
              </button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300">10K+</div>
                <div className="text-emerald-200 text-sm">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-emerald-200 text-sm">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300">1M+</div>
                <div className="text-emerald-200 text-sm">Experiences</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-gray-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* How It Works Section with Enhanced Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 font-semibold text-sm mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Three Simple Steps to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Concert Magic
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands who've discovered their perfect concert companions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting lines */}
          <div className="hidden md:block absolute top-20 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-emerald-200 to-teal-200"></div>
          
          <div className="relative group">
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-10"></div>
              <div className="text-6xl mb-8 text-center">
                <div className="inline-block p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
                  🎯
                </div>
              </div>
              <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Match by Music Taste</h3>
              <p className="text-gray-600 text-center leading-relaxed text-lg">
                Our smart algorithm connects you with people who share your exact music preferences and concert vibes.
              </p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full opacity-10"></div>
              <div className="text-6xl mb-8 text-center">
                <div className="inline-block p-4 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl">
                  💬
                </div>
              </div>
              <div className="absolute top-4 left-4 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Chat & Plan Together</h3>
              <p className="text-gray-600 text-center leading-relaxed text-lg">
                Message your matches, coordinate meetups, split costs, and plan the perfect concert experience together.
              </p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-10"></div>
              <div className="text-6xl mb-8 text-center">
                <div className="inline-block p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl">
                  🎉
                </div>
              </div>
              <div className="absolute top-4 left-4 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Experience Together</h3>
              <p className="text-gray-600 text-center leading-relaxed text-lg">
                Attend amazing concerts with your new friends and create lifelong memories through shared music experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Social Proof Section */}
      <div className="bg-gradient-to-r from-gray-50 to-emerald-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 font-semibold text-sm mb-4">
              SUCCESS STORIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                10,000+ Concert Buddies
              </span>
            </h2>
            <p className="text-xl text-gray-600">Real stories from our amazing community</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-10"></div>
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  A
                </div>
                <div className="text-left flex-1">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-800 text-lg italic mb-4 leading-relaxed">
                    "Found my concert crew through FindConcertPal! We've been to 15 shows together this year. Best decision ever!"
                  </p>
                  <p className="text-emerald-700 font-bold">Alex, 24</p>
                  <p className="text-gray-500 text-sm">San Francisco</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full opacity-10"></div>
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  S
                </div>
                <div className="text-left flex-1">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-800 text-lg italic mb-4 leading-relaxed">
                    "As someone new to the city, this app helped me find friends who share my love for indie rock. Game changer!"
                  </p>
                  <p className="text-teal-700 font-bold">Sarah, 28</p>
                  <p className="text-gray-500 text-sm">Austin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Genre Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-amber-100 rounded-full text-amber-700 font-semibold text-sm mb-4">
            ALL GENRES WELCOME
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Buddies for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              Any Genre
            </span>
          </h2>
          <p className="text-xl text-gray-600">Whatever your music taste, there's someone who shares it</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { genre: '🎸 Rock', color: 'from-red-500 to-rose-600' },
            { genre: '🎵 Pop', color: 'from-pink-500 to-fuchsia-600' },
            { genre: '🎺 Jazz', color: 'from-blue-500 to-indigo-600' },
            { genre: '🎤 Hip Hop', color: 'from-gray-700 to-slate-800' },
            { genre: '🎼 Classical', color: 'from-violet-500 to-purple-600' },
            { genre: '🔊 EDM', color: 'from-emerald-500 to-teal-600' },
            { genre: '🎻 Country', color: 'from-amber-500 to-orange-600' },
            { genre: '🎹 R&B', color: 'from-cyan-500 to-blue-600' }
          ].map(({ genre, color }, index) => (
            <span 
              key={genre} 
              className={`px-8 py-4 bg-gradient-to-r ${color} text-white font-bold rounded-2xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer animate-pulse`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Final CTA Section with Unique Colors */}
      <div className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-teal-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
              Ready to Find Your{" "}
              <span className="text-amber-400">Concert Buddy?</span>
            </h2>
            <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of music lovers who've found their perfect concert companions and never go to a show alone again
            </p>
            <button 
              onClick={() => navigate("/signup")}
              className="group px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-2xl rounded-2xl shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <span className="flex items-center justify-center space-x-3">
                <span>🎸</span>
                <span>Get Started Today</span>
                <span className="group-hover:translate-x-2 transition-transform">🎵</span>
              </span>
            </button>
            <p className="text-gray-400 mt-6 text-lg">
              Free to join • Find your first buddy today • 100% safe & secure
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-emerald-400/20 rounded-full animate-spin slow"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-amber-400/30 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
} 