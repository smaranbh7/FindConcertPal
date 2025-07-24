import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/Action";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector(store => store);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  useEffect(() => {
    if (auth.user) {
      navigate("/home");
    }
  }, [auth.user, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      const loginData = {
        email: formData.email,
        password: formData.password
      };
      
      console.log("Attempting login with:", loginData);
      await dispatch(login(loginData));
      
      // Check if we have a JWT after login
      const jwt = localStorage.getItem('jwt');
      console.log("JWT after login:", jwt);
      
      if (jwt) {
        console.log("JWT found, fetching user profile...");
        // Force navigation to dashboard after successful login
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-800 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>
        
        {/* Floating musical notes */}
        <div className="absolute top-20 left-20 text-emerald-300 text-2xl animate-bounce delay-700 opacity-40">♪</div>
        <div className="absolute top-40 right-32 text-cyan-300 text-xl animate-bounce delay-1000 opacity-40">♫</div>
        <div className="absolute bottom-60 left-1/4 text-teal-300 text-3xl animate-bounce delay-300 opacity-40">♬</div>
        <div className="absolute top-60 right-1/4 text-emerald-300 text-xl animate-bounce delay-1500 opacity-40">♩</div>
        <div className="absolute bottom-40 right-20 text-amber-300 text-2xl animate-bounce delay-800 opacity-40">🎵</div>
      </div>

      {/* Glass morphism card */}
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-5xl">🎵</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-emerald-100">Sign in to FindConcertPal</p>
          </div>

          {auth.error && (
            <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 rounded-lg">
              {auth.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
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
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-400 focus:ring-emerald-400 border-white/30 rounded bg-white/10"
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-emerald-100">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-amber-300 hover:text-amber-200 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-300">Don't have an account? </span>
              <Link to="/signup" className="text-amber-300 hover:text-amber-200 font-medium transition-colors">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-16 h-16 border-2 border-emerald-400/30 rounded-full animate-spin opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-amber-400/30 rounded-full animate-bounce opacity-20"></div>
      <div className="absolute top-1/2 right-20 w-8 h-8 bg-teal-400/20 rounded-full animate-ping"></div>
    </div>
  );
}
