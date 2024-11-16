"use client";
import React, { useState } from "react";
import { WalletDefault } from "@coinbase/onchainkit/wallet";
import {
  Heart,
  MessageCircle,
  Share2,
  Gift,
  Music,
  Sparkles,
} from "lucide-react";

const MainFeed = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      id: 1,
      creator: "Artist Name",
      title: "Original Track",
      type: "original",
      nftInfo: {
        price: "0.1 ETH",
        collected: 128,
      },
      engagement: {
        likes: "1.2K",
        comments: 234,
        shares: 45,
      },
    },
    // More videos...
  ];

  const VideoCard = ({ video }: { video: any }) => (
    <div className="h-full w-full snap-start relative">
      {/* Video Player */}
      <div className="absolute inset-0">
        <img
          src={`/api/placeholder/390/${844}`}
          alt="Video content"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Sidebar Actions */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-6">
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
          <Heart className="w-8 h-8" />
          <span className="text-xs mt-1">{video.engagement.likes}</span>
        </button>

        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
          <MessageCircle className="w-8 h-8" />
          <span className="text-xs mt-1">{video.engagement.comments}</span>
        </button>

        {/* NFT Collection Button */}
        <button className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Gift className="w-8 h-8 mx-auto" />
          <span className="text-xs mt-1">{video.nftInfo.price}</span>
        </button>

        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
          <Share2 className="w-8 h-8" />
        </button>
      </div>

      {/* Bottom Info Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{video.creator}</span>
            {video.type === "original" && (
              <Sparkles className="w-4 h-4 text-yellow-400" />
            )}
          </div>
          <div className="text-sm text-gray-300">{video.title}</div>
        </div>

        <div className="flex items-center space-x-2">
          <Music className="w-4 h-4" />
          <span className="text-sm">
            {video.type === "original"
              ? "Original Track"
              : "Using Original Sound"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 w-full z-50 p-4 bg-gradient-to-b from-black to-transparent">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">MVer</h1>
          <WalletDefault />
        </div>
      </div>

      {/* Video Feed */}
      <div className="h-full snap-y snap-mandatory overflow-y-scroll">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default MainFeed;
