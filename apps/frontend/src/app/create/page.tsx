import CreatePage from "@/components/pages/Create";
import { metadata as defaultMetadata } from "@/app/layout";
import { Metadata } from "next";

const title = "Create";

export const metadata: Metadata = {
  ...defaultMetadata,
  title,
  openGraph: {
    ...defaultMetadata.openGraph,
    title,
  },
};

export default CreatePage;