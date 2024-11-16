"use client";
import React, { useState } from "react";
import { Settings } from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"created" | "collected">(
    "created"
  );

  const ProfileHeader = () => (
    <div className="p-4 border-b border-gray-800">
      {/* Profile Info */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
        <div className="flex-1">
          <h2 className="text-xl font-bold">Username</h2>
          <p className="text-sm text-gray-400">user.eth</p>
        </div>
        <button className="p-2 rounded-lg bg-gray-800">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-around mt-6">
        <div className="text-center">
          <div className="font-bold text-xl">24</div>
          <div className="text-sm text-gray-400">Created</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-xl">142</div>
          <div className="text-sm text-gray-400">Collected</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-xl">1.2K</div>
          <div className="text-sm text-gray-400">Followers</div>
        </div>
      </div>
    </div>
  );

  const ContentGrid = () => (
    <div className="grid grid-cols-3 gap-1 p-1">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="aspect-square bg-gray-800 rounded-sm">
          {/* Thumbnail */}
          <img
            src={`/api/placeholder/150/150`}
            alt="Content thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <ProfileHeader />

      {/* Content Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex">
          <button
            className={`flex-1 py-3 font-medium ${
              activeTab === "created"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("created")}
          >
            Created
          </button>
          <button
            className={`flex-1 py-3 font-medium ${
              activeTab === "collected"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("collected")}
          >
            Collected
          </button>
        </div>
      </div>

      {/* Content */}
      <ContentGrid />
    </div>
  );
};

export default ProfilePage;
