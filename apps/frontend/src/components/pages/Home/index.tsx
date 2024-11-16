"use client";
import React, { useState } from "react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  Heart,
  MessageCircle,
  Share2,
  Gift,
  Music,
  Sparkles,
} from "lucide-react";
import { WalletDropdownNextLink } from "@/components/ui/WalletDropdownNextLink";

const MainFeed = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        video.muted = isMuted;
        if (!isPaused) {
          try {
            video.play();
          } catch (error) {
            // Ignore play interruption errors
          }
        } else {
          video.pause();
        }
      } else {
        video.pause();
      }
    });
  };

  const handleVideoTap = (video: HTMLVideoElement) => {
    if (isMuted) {
      // First tap unmutes
      setIsMuted(false);
      video.muted = false;
    } else {
      // After unmuted, handle play/pause
      if (!isPaused) {
        video.pause();
        setIsPaused(true);
      } else {
        video.play();
        setIsPaused(false);
      }
    }
  };

  const VideoCard = ({ video }: { video: any }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      videoElement.muted = isMuted;

      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });
      observer.observe(videoElement);

      if (videoElement.getBoundingClientRect().top === 0) {
        if (!isPaused) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      }

      return () => observer.disconnect();
    }, [isPaused, isMuted]);

    return (
      <div className="h-full w-full snap-start relative">
        {/* Video Player */}
        <div
          className="absolute inset-0"
          onClick={() => videoRef.current && handleVideoTap(videoRef.current)}
        >
          <video
            ref={videoRef}
            src={video.video.url}
            className="h-full w-full object-cover"
            loop
            playsInline
            autoPlay
            muted={isMuted}
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
              {video.track.title} - {video.track.artist}
            </span>
          </div>
        </div>

        {/* Status indicators */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {isMuted && (
            <div className="bg-black/50 p-2 rounded-full">
              <span className="text-white">🔇 Tap to unmute</span>
            </div>
          )}
          {isPaused && (
            <div className="bg-black/50 p-2 rounded-full">
              <span className="text-white">⏸️</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 w-full max-w-xl z-50 p-4 bg-gradient-to-b from-black to-transparent">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">MVer</h1>
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownNextLink href="/create">
                Create
              </WalletDropdownNextLink>
              <WalletDropdownNextLink href="/profile">
                Profile
              </WalletDropdownNextLink>
              <WalletDropdownBasename />
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
              >
                Wallet
              </WalletDropdownLink>
              <WalletDropdownFundLink />
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
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

const videos = [
  {
    id: 1,
    creator: "ryorod",
    title: "sazareba part1",
    type: "original",
    track: {
      title: "sazareba part1",
      artist: "ryorod",
    },
    video: {
      url: "/assets/videos/sazareba-demo-1.mp4",
    },
    nftInfo: {
      price: "0.01 ETH",
      collected: 128,
    },
    engagement: {
      likes: "1.2K",
      comments: 234,
      shares: 45,
    },
  },
  {
    id: 2,
    creator: "ryorod",
    title: "sazareba part2",
    type: "original",
    track: {
      title: "sazareba part2",
      artist: "ryorod",
    },
    video: {
      url: "/assets/videos/sazareba-demo-2.mp4",
    },
    nftInfo: {
      price: "0.01 ETH",
      collected: 98,
    },
    engagement: {
      likes: "1.1K",
      comments: 123,
      shares: 34,
    },
  },
  {
    id: 3,
    creator: "ryorod",
    title: "sazareba part3",
    type: "original",
    track: {
      title: "sazareba part3",
      artist: "ryorod",
    },
    video: {
      url: "/assets/videos/sazareba-demo-3.mp4",
    },
    nftInfo: {
      price: "0.01 ETH",
      collected: 34,
    },
    engagement: {
      likes: "843",
      comments: 56,
      shares: 27,
    },
  },
  {
    id: 4,
    creator: "ryorod",
    title: "sazareba part4",
    type: "original",
    track: {
      title: "sazareba part4",
      artist: "ryorod",
    },
    video: {
      url: "/assets/videos/sazareba-demo-4.mp4",
    },
    nftInfo: {
      price: "0.01 ETH",
      collected: 12,
    },
    engagement: {
      likes: "552",
      comments: 21,
      shares: 13,
    },
  },
  {
    id: 5,
    creator: "ryorod",
    title: "prayer remix demo",
    type: "original",
    track: {
      title: "prayer remix demo",
      artist: "ryorod",
    },
    video: {
      url: "/assets/videos/prayer-remix-demo.mp4",
    },
    nftInfo: {
      price: "0.02 ETH",
      collected: 10,
    },
    engagement: {
      likes: "729",
      comments: 96,
      shares: 48,
    },
  },
];
