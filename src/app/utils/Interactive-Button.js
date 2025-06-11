import { useState } from 'react';

export default function InteractiveButton({ onClick, src, styleWidthHeight = 'w-40 h-12', sound = false, soundSrc = '' }) {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => {
        setClicked(true);
        setTimeout(() => onClick(), 100);
      }}
      className={`${styleWidthHeight} bg-no-repeat bg-center bg-cover transition transform hover:scale-110 hover:brightness-125`}
      style={{
        backgroundImage: `url(${src})`,
        cursor: 'pointer',
      }}
    >
      {sound && soundSrc && clicked && (
        <audio
          src={soundSrc}
          autoPlay
          volume={1}
          onEnded={() => setClicked(false)}
        />
      )}
    </button>
  );
}