'use client';
import { useState } from 'react';
import StartScreen from './components/start';
import { PermissionProvider } from './PermissionContext';
import { Provider } from 'react-redux';
import store from './store';
import CommandBar from './utils/Commands';
import Main from './components/main';

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
    <Provider store={store}>
      <PermissionProvider>
        {
          !started ? (
            <StartScreen onStart={startGame} />
          ) : (<Main />)
        }
      </PermissionProvider>
      <CommandBar />
    </Provider>
  );
}
