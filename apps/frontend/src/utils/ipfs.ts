import { PINATA_GATEWAY, PINATA_JWT } from "@/constants/config";
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY,
});

export const uploadFileToIpfs = async (file: File) => {
  const added = await pinata.upload.file(file);
  return added.IpfsHash;
};

export const uploadJsonToIpfs = async (json: object) => {
  const added = await pinata.upload.json(json);
  return added.IpfsHash;
};

export const uploadMetadataToIPFS = async (
  name: string,
  description: string,
  imageFile: File,
  videoFile: File
) => {
  try {
    const imageCID = await uploadFileToIpfs(imageFile);
    const imageUrl = `ipfs://${imageCID}`;
    const videoCID = await uploadFileToIpfs(videoFile);
    const videoUrl = `ipfs://${videoCID}`;

    const metadata: NFTMetadata = {
      name,
      description,
      image: imageUrl,
      animation_url: videoUrl,
    };

    const metadataCID = await uploadJsonToIpfs(metadata);
    const metadataUrl = `ipfs://${metadataCID}`;

    return {
      metadataUrl,
      imageUrl,
      videoUrl,
    };
  } catch (error) {
    console.error("IPFS Upload Error:", error);
    return null;
  }
};

export const convertIpfsUrlToGatewayUrl = (url: string) => {
  return url.replace("ipfs://", `https://${PINATA_GATEWAY}/ipfs/`);
};
