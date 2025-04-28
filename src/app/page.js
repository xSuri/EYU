'use client';
import { useState } from 'react';
import StartScreen from './components/start';
import Earth from './components/earth';
import { PermissionProvider } from './PermissionContext';

export default function Home() {
  const [started, setStarted] = useState(false);

  const startGame = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    const TIMEOUT = 1000 * 3;

    setTimeout(() => setStarted(true), TIMEOUT);
  };

  return (
    <PermissionProvider>
      {
        !started ? (
          <StartScreen onStart={startGame} />
        ) : (<Earth />)
      }
    </PermissionProvider>
  );
}
