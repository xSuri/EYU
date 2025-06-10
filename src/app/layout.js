// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import FullScreenButton from './utils/FullScreen-Button';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "EYU",
  description: "Expand Your Universe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen bg-black text-white">
          <FullScreenButton />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}