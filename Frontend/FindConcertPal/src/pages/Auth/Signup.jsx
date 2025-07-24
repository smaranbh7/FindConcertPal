import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/Action";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector(store => store);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    favoriteGenres: [],
    city: "",
    state: "",
    country: ""
  });

  const genres = [
    "Rock", "Pop", "Jazz", "Hip Hop", "Classical", 
    "Electronic", "Country", "R&B", "Alternative", "Indie"
  ];

  useEffect(() => {
    if (auth.user) {
      navigate('/home');
    }
  }, [auth.user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (formData.favoriteGenres.length === 0) {
      alert("Please select at least one music genre!");
      return;
    }

    setIsLoading(true);
    try {
      // Prepare data for backend
      const registerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        favoriteGenres: formData.favoriteGenres,
        location: {
          city: formData.city,
          state: formData.state,
          country: formData.country
        }
      };
      
      dispatch(register(registerData));
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-800 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-700"></div>
        
        {/* Floating musical notes */}
        <div className="absolute top-20 right-20 text-emerald-300 text-3xl animate-bounce delay-700 opacity-40">♪</div>
        <div className="absolute top-1/2 left-20 text-cyan-300 text-2xl animate-bounce delay-1000 opacity-40">♫</div>
        <div className="absolute bottom-40 left-1/3 text-teal-300 text-4xl animate-bounce delay-300 opacity-40">♬</div>
        <div className="absolute top-1/3 right-1/3 text-emerald-300 text-2xl animate-bounce delay-1500 opacity-40">♩</div>
        <div className="absolute bottom-20 right-1/4 text-amber-300 text-3xl animate-bounce delay-800 opacity-40">🎵</div>
        <div className="absolute top-40 left-1/2 text-cyan-300 text-xl animate-bounce delay-1200 opacity-40">🎼</div>
      </div>

      {/* Glass morphism card */}
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 relative z-10 my-8">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-5xl">🎸</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join FindConcertPal</h1>
            <p className="text-emerald-100">Start connecting with music lovers</p>
          </div>

          {auth.error && (
            <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 rounded-lg">
              {auth.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-100 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  placeholder="John"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-100 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  placeholder="Doe"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-100 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                placeholder="john@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-100 mb-2">
                Country <span className="text-gray-400 text-xs">(use country code)</span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                placeholder="US, CA, GB, AU, DE, FR..."
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-100 mb-2">
                  State/Province <span className="text-gray-400 text-xs">(if US/CA)</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  placeholder="CA, NY, TX, ON, BC..."
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-100 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  placeholder="San Francisco"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-100 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                placeholder="Password"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-100 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                placeholder="Confirm password"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-100 mb-3">
                Music Genres You Like
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm rounded-full border transition-all transform hover:scale-105 ${
                      formData.favoriteGenres.includes(genre)
                        ? 'bg-emerald-500/30 border-emerald-400/50 text-emerald-100 backdrop-blur-sm'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-300">Already have an account? </span>
              <Link to="/login" className="text-amber-300 hover:text-amber-200 font-medium transition-colors">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-emerald-400/30 rounded-full animate-spin opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-amber-400/30 rounded-full animate-bounce opacity-20"></div>
      <div className="absolute top-1/3 left-20 w-12 h-12 bg-teal-400/20 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 right-20 w-8 h-8 bg-cyan-400/20 rounded-full animate-pulse"></div>
    </div>
  );
}
