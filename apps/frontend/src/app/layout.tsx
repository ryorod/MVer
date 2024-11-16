import type { Metadata } from "next";
import "./globals.css";
import Fonts from "@/fonts";
import { SITE_URL } from "@/constants/config";
import { Providers } from "./providers";
import "@coinbase/onchainkit/styles.css";

const title = "MVer";
const titleDefault = "MVer";
const titleTemplate = "%s :: MVer";
const description = ``;
const url = SITE_URL;

export const metadata: Metadata = {
  title: {
    default: titleDefault,
    template: titleTemplate,
  },
  description,
  openGraph: {
    title: {
      default: titleDefault,
      template: titleTemplate,
    },
    description,
    type: "website",
    locale: "en_US",
    url,
    siteName: title,
    // images: [
    //   {
    //     url: SITE_URL + "/ogp.png",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Fonts.openSans.className} antialiased min-h-screen`}>
        <div>
          <Providers>
            <main>{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
