import React, { useState, useEffect } from 'react';

export default function EditProfileModal({ isOpen, onClose, user, onUpdate }) {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    city: user?.city || '',
    state: user?.state || '',
    country: user?.country || '',
    bio: user?.bio || '',
    age: user?.age || '',
    favoriteGenres: user?.favoriteGenres || []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        bio: user.bio || '',
        age: user.age || '',
        favoriteGenres: user.favoriteGenres || []
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Edit Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                required
                min="18"
                max="120"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-500 resize-none"
                required
              />
            </div>

            {/* Favorite Genres */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Favorite Genres
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.favoriteGenres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm group relative"
                  >
                    {genre}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          favoriteGenres: prev.favoriteGenres.filter((_, i) => i !== index)
                        }));
                      }}
                      className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="newGenre"
                  name="newGenre"
                  placeholder="Add a genre..."
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const newGenre = e.target.value.trim();
                      if (newGenre && !formData.favoriteGenres.includes(newGenre)) {
                        setFormData(prev => ({
                          ...prev,
                          favoriteGenres: [...prev.favoriteGenres, newGenre]
                        }));
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = document.getElementById('newGenre');
                    const newGenre = input.value.trim();
                    if (newGenre && !formData.favoriteGenres.includes(newGenre)) {
                      setFormData(prev => ({
                        ...prev,
                        favoriteGenres: [...prev.favoriteGenres, newGenre]
                      }));
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-1">
                Press Enter or click Add to add a new genre
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
