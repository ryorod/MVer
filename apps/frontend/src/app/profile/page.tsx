import ProfilePage from "@/components/pages/Profile";
import { metadata as defaultMetadata } from "@/app/layout";
import { Metadata } from "next";

const title = "Profile";

export const metadata: Metadata = {
  ...defaultMetadata,
  title,
  openGraph: {
    ...defaultMetadata.openGraph,
    title,
  },
};

export default ProfilePage;
