"use client";
import React, { useState } from "react";
import { Upload, Shield, Loader } from "lucide-react";
import { MVerFactoryABIAddress } from "@/constants/abiAndAddress";
import TransactionComponents from "@/components/ui/TransactionComponents";
import { useAccount } from "wagmi";
import { uploadJsonToIpfs, uploadMetadataToIPFS } from "@/utils/ipfs";
import { parseEther } from "viem";

const CreatePage = () => {
  const [uploadState, setUploadState] = useState<
    "idle" | "uploading" | "verifying" | "minting"
  >("idle");
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [selectedThumbnailFile, setSelectedThumbnailFile] =
    useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    // isOriginal: false,
    // musicReference: "",
  });
  const [price, setPrice] = useState<string>("");
  const [maxSupply, setMaxSupply] = useState<string>("");
  const [genre, setGenre] = useState<string>("MUSIC");
  const { address } = useAccount();

  const prepareCreateContentArgs = async () => {
    if (
      !selectedVideoFile ||
      !selectedThumbnailFile ||
      !metadata.title ||
      !metadata.description ||
      !price ||
      !maxSupply ||
      !address
    ) {
      throw new Error("Missing required data");
    }

    setUploadState("uploading");

    try {
      // Upload files to IPFS
      const uploadResult = await uploadMetadataToIPFS(
        metadata.title,
        metadata.description,
        selectedThumbnailFile,
        selectedVideoFile
      );

      if (!uploadResult) {
        throw new Error("Failed to upload metadata");
      }

      const collectibleMetadata: NFTMetadata = {
        name: `${metadata.title} Collectible`,
        description: metadata.description,
        image: uploadResult.imageUrl,
        animation_url: uploadResult.videoUrl,
      };

      // Upload metadata to IPFS
      const collectibleURI = await uploadJsonToIpfs(collectibleMetadata);

      setUploadState("minting");

      return [
        metadata.title,
        genre,
        uploadResult.metadataUrl,
        collectibleURI,
        parseEther(price),
        maxSupply,
      ];
    } catch (error) {
      setUploadState("idle");
      throw error;
    }
  };

  const UploadStatus = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        {uploadState === "uploading" && (
          <>
            <Loader className="w-6 h-6 animate-spin mb-2" />
            <p>Uploading...</p>
          </>
        )}
        {uploadState === "verifying" && (
          <>
            <Shield className="w-6 h-6 mb-2 text-yellow-400" />
            <p>Verifying content...</p>
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

        {uploadState === "idle" ? (
          <div className="space-y-6">
            {/* Vide File Upload */}
            <div
              className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center"
              onClick={() => document.getElementById("videoFileInput")?.click()}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Tap to upload video</p>
              <input
                id="videoFileInput"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) =>
                  setSelectedVideoFile(e.target.files?.[0] || null)
                }
              />
            </div>

            {/* Thumbnail File Upload */}
            <div
              className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center"
              onClick={() =>
                document.getElementById("thumbnailFileInput")?.click()
              }
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Tap to upload thumbnail</p>
              <input
                id="thumbnailFileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setSelectedThumbnailFile(e.target.files?.[0] || null)
                }
              />
            </div>

            {/* Metadata Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full bg-gray-800 rounded-lg p-3"
                value={metadata.title}
                onChange={(e) =>
                  setMetadata({ ...metadata, title: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                className="w-full bg-gray-800 rounded-lg p-3 h-24"
                value={metadata.description}
                onChange={(e) =>
                  setMetadata({ ...metadata, description: e.target.value })
                }
              />

              {/* <div className="flex items-center space-x-2">
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
                      setMetadata({
                        ...metadata,
                        musicReference: e.target.value,
                      })
                    }
                  />
                </div>
              )} */}

              <input
                type="number"
                placeholder="Price (ETH) (e.g. 0.001)"
                className="w-full bg-gray-800 rounded-lg p-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.001"
                min="0"
              />

              <input
                type="number"
                placeholder="Max Supply (e.g. 100)"
                className="w-full bg-gray-800 rounded-lg p-3"
                value={maxSupply}
                onChange={(e) => setMaxSupply(e.target.value)}
                min="1"
              />
            </div>

            {/* Upload Button */}
            <TransactionComponents
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold text-white [&_*]:text-white"
              contract={{
                ...MVerFactoryABIAddress,
                functionName: "createContent",
                args: [], // temporary
              }}
              buttonText="Upload Content"
              getArgsBeforeSubmit={prepareCreateContentArgs}
            />
          </div>
        ) : (
          <UploadStatus />
        )}
      </div>
    </div>
  );
};

export default CreatePage;
