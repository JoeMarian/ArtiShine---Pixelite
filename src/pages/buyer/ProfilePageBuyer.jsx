import React, { useState } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import Navigation from '../../components/Navigation';
import { User } from 'lucide-react';

const ProfilePageBuyer = () => {
  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    address: '123 MG Road, Bangalore, Karnataka 560001',
  });

  return (
    <div className="min-h-screen  pb-20 pt-20">
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-white font-serif font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-12 w-12 text-primary-foreground" />
              </div>
              <PrimaryButton variant="outline" size="sm">Upload Photo</PrimaryButton>
            </div>
            <div className="card-warm p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" value={profile.email} onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input type="tel" value={profile.phone} onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Default Delivery Address</label>
                <textarea value={profile.address} onChange={(e) => setProfile((prev) => ({ ...prev, address: e.target.value }))} rows={3} className="w-full px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none" />
              </div>
              <PrimaryButton size="lg" className="w-full">Save Changes</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      <Navigation userRole="buyer" />
    </div>
  );
};

export default ProfilePageBuyer;


