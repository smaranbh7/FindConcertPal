import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import EditProfileModal from './EditProfileModal';
import { updateProfile, uploadProfileImage } from '../../redux/profile/Action';

// Fallback data in case Redux state is not available
const fallbackUser = {
  id: 1,
  fullName: "Sarah Johnson",
  email: "sarah.j@example.com",
  profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=400",
  city: "San Francisco",
  state: "CA",
  bio: "Music enthusiast 🎵 | Concert lover 🎸 | Always ready for the next show! Looking for concert buddies who share my passion for live music.",
  age: 25,
  favoriteGenres: ["Pop", "Rock", "Indie", "Alternative"],
  upcomingConcerts: [
    {
      id: 1,
      title: "Taylor Swift - Eras Tour",
      date: "2024-07-15",
      venue: "Levi's Stadium",
      image: "https://example.com/taylor-swift.jpg"
    },
    {
      id: 2,
      title: "The Weeknd - After Hours",
      date: "2024-08-20",
      venue: "Chase Center",
      image: "https://example.com/weeknd.jpg"
    }
  ]
};

export default function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading, error, uploadingImage } = useSelector(state => state.profile);
  const { concerts: upcomingConcerts } = useSelector(state => state.myConcerts);

  const handleUpdateProfile = async (updatedData) => {
    try {
      await dispatch(updateProfile(updatedData));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await dispatch(uploadProfileImage(file));
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-image-upload"
              />
              <label htmlFor="profile-image-upload" className="cursor-pointer block">
                <img
                  src={user?.profileImage || fallbackUser.profileImage}
                  alt={user?.fullName || fallbackUser.fullName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500/30"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  {uploadingImage ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <span className="text-white text-sm">Change Photo</span>
                  )}
                </div>
              </label>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {user?.fullName || fallbackUser.fullName}
              </h1>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                  {user?.age || fallbackUser.age} years old
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                  {user?.city || fallbackUser.city}, {user?.state || fallbackUser.state}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{user?.bio || fallbackUser.bio}</p>
              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Favorite Genres */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Favorite Genres</h2>
          <div className="flex flex-wrap gap-2">
            {(user?.favoriteGenres || fallbackUser.favoriteGenres).map((genre, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Upcoming Concerts */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Upcoming Concerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(upcomingConcerts || fallbackUser.upcomingConcerts).map((concert) => (
              <div
                key={concert.id}
                className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
              >
                <div className="aspect-video bg-gray-800">
                  {/* Concert image placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    🎵
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">{concert.title}</h3>
                  <p className="text-gray-400 text-sm mb-1">{concert.venue}</p>
                  <p className="text-emerald-400 text-sm">
                    {new Date(concert.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onUpdate={handleUpdateProfile}
      />
    </div>
  );
}
