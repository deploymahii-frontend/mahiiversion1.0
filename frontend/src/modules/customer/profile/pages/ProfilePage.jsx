import { useState } from "react";
import useProfile from "../hooks/useProfile";
import useAuthStore from "@/modules/auth/store/auth.store";
import ProfileHeader from "../components/ProfileHeader";
import PersonalInfoCard from "../components/PersonalInfoCard";
import AccountStats from "../components/AccountStats";
import MembershipCard from "../components/MembershipCard";
import SecurityCard from "../components/SecurityCard";
import LogoutCard from "../components/LogoutCard";
import { X, Save, User, Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data = {}, isLoading, updateProfile, isUpdating } = useProfile();
  const authUser = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const accessToken = useAuthStore((s) => s.accessToken);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Merge backend data with auth store user data
  const currentUser = {
    name: authUser?.name || authUser?.fullName || data?.user?.name || "Valued Customer",
    email: authUser?.email || data?.user?.email || "customer@mahii.in",
    phone: authUser?.phone || authUser?.phoneNumber || data?.user?.phone || "+91 9876543210",
    avatar: authUser?.avatar || authUser?.profilePicture || data?.user?.avatar,
    memberSince: data?.user?.memberSince || "Jan 2026",
    isGold: data?.user?.isGold ?? true,
  };

  const userStats = data.stats || { orders: 12, wishlist: 5, reviews: 3, points: 350 };
  const userMembership = data.membership || { plan: "Mahii Gold", expiresAt: "Dec 2026" };

  // Form State
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
  });

  const handleOpenEdit = () => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      // Update local Auth store
      const updatedUser = { ...authUser, ...formData };
      login(updatedUser, accessToken);

      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-36 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
        <div className="h-44 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Account Profile
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Manage your personal details and subscription preferences
        </p>
      </div>

      {/* Sections */}
      <ProfileHeader user={currentUser} onEdit={handleOpenEdit} />
      <AccountStats stats={userStats} />
      <PersonalInfoCard user={currentUser} />
      <MembershipCard membership={userMembership} />
      <SecurityCard />
      <LogoutCard />

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-800 relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Edit Profile Details
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <User size={18} className="text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-transparent outline-none flex-1 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Mail size={18} className="text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-transparent outline-none flex-1 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Phone size={18} className="text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-transparent outline-none flex-1 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                  <Save size={18} />
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
