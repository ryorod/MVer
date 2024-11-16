"use client";
import React, { useState } from "react";
import { Upload, Music, Shield, Loader } from "lucide-react";

const CreatePage = () => {
  const [uploadState, setUploadState] = useState<
    "idle" | "uploading" | "verifying" | "minting"
  >("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    isOriginal: false,
    musicReference: "",
  });

  const UploadForm = () => (
    <div className="space-y-6">
      {/* File Upload */}
      <div
        className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center"
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400">Tap to upload video</p>
        <input
          id="fileInput"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
      </div>

      {/* Metadata Form */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full bg-gray-800 rounded-lg p-3"
          value={metadata.title}
          onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full bg-gray-800 rounded-lg p-3 h-24"
          value={metadata.description}
          onChange={(e) =>
            setMetadata({ ...metadata, description: e.target.value })
          }
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isOriginal"
            checked={metadata.isOriginal}
            onChange={(e) =>
              setMetadata({ ...metadata, isOriginal: e.target.checked })
            }
          />
          <label htmlFor="isOriginal">This is an original track</label>
        </div>

        {!metadata.isOriginal && (
          <div className="flex space-x-2">
            <Music className="w-5 h-5" />
            <input
              type="text"
              placeholder="Original track reference"
              className="flex-1 bg-gray-800 rounded-lg p-2"
              value={metadata.musicReference}
              onChange={(e) =>
                setMetadata({ ...metadata, musicReference: e.target.value })
              }
            />
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
        // onClick={handleUpload}
      >
        Upload Content
      </button>
    </div>
  );

  const UploadStatus = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        {uploadState === "uploading" && (
          <>
            <Loader className="w-6 h-6 animate-spin mb-2" />
            <p>Uploading to IPFS...</p>
          </>
        )}
        {uploadState === "verifying" && (
          <>
            <Shield className="w-6 h-6 mb-2 text-yellow-400" />
            <p>Verifying content rights...</p>
          </>
        )}
        {uploadState === "minting" && (
          <>
            {/* <Sparkles className="w-6 h-6 mb-2 text-blue-400" /> */}
            <p>Creating your NFT...</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create</h1>

        {uploadState === "idle" ? <UploadForm /> : <UploadStatus />}
      </div>
    </div>
  );
};

export default CreatePage;
