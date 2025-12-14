import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, Award } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-stone-800">My Profile</h1>
        <p className="text-stone-500 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 p-8 text-center sticky top-24">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-6">
              {user.email[0].toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-stone-800 break-words">{user.email}</h2>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-3">
              <Shield className="w-3 h-3" />
              {user.role}
            </div>
          </div>
        </div>

        {/* Details Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Account Details */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-stone-200 p-8">
            <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Account Details
            </h3>
            
            <div className="space-y-6">
              <div className="group">
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">Email Address</label>
                <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100 group-hover:border-orange-200 transition-colors">
                  <div className="bg-white p-2 rounded-lg text-stone-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-stone-700">{user.email}</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wide mb-1.5">User ID</label>
                <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100 group-hover:border-orange-200 transition-colors">
                  <div className="bg-white p-2 rounded-lg text-stone-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-stone-700">#{user.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats / Placeholder */}
          <div className="bg-gradient-to-r from-stone-800 to-stone-900 rounded-[2rem] shadow-lg p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">Member Status</h3>
                <p className="text-stone-400 text-sm">Active since 2025</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm font-medium text-stone-300">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                Account Active
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};