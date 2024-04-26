import LeftSide from "./components/LeftSide";
import Navbar from "./components/Navbar";
import RightSide from "./components/RightSide";
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "BENZERDJEB Adnane",
  description: "Benzerdjeb mohamed adnane's portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="favicon.png" type="image/x-icon" />
        <meta property="og:title" content="BENZERDJEB Adnane" />
        <meta property="og:description" content="Software Engineer" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dxobgdfyq/image/upload/v1696446212/nsz6yiupgwfv6syv9diy.png"
        />
        <meta
          property="og:url"
          content="https://skillzdev-portfolio.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </head>
      <body className="font-bodyFont w-full h-screen bg-bodyColor text-textLight overflow-x-hidden overflow-y-scroll scrollbar scrollbar-track-textDark/20 scrollbar-thumb-textDark/60">
        <Navbar />
        <div className="w-full h-[88vh] xl:flex items-center gap-20 justify-between">
          <div className="hidden  xl:inline-flex w-32 h-full fixed left-0 bottom-0">
            <LeftSide />
          </div>
          <main className="h-[88vh] w-full mx-auto mdl:px-40 px-11  py-4">
            {children}
            <Analytics />
          </main>
          <div className="hidden xl:inline-flex w-32 h-full fixed right-0 bottom-0">
            <RightSide />
          </div>
        </div>
      </body>
      {/* Footer */}
    </html>
  );
}
