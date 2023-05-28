import "./globals.css";
import { Inter } from "next/font/google";
import { ModalContextProvier } from "../context/modalcontext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Banco Papaya",
  description: "Generated by create next app",
  url: "",
  image: "/banner.png",
  twitterUsername: "@bancopapaya",
  author: "Team Bank Papaya",
  twitterHandle: "@teambancopapaya",
  keywords: "bancopapaya",
  siteLanguage: "en",
  ogLanguage: "en_US",
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalContextProvier>{children}</ModalContextProvier>
      </body>
    </html>
  );
}
