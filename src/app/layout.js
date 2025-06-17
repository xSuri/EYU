import './globals.css';
import FullScreenButton from './utils/FullScreen-Button';

export const metadata = {
  title: 'EYU',
  description: 'Expand Your Universe',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen bg-black text-white">
          <FullScreenButton />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}