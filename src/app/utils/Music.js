import { useRef, useEffect } from 'react';
import { usePermission } from '../PermissionContext';

let audio;

export default function BackgroundMusic({ src }) {
    const audioRef = useRef(null);
    const { perms } = usePermission();

    useEffect(() => {
        audio = audioRef;

        if(perms){
            setTimeout(() => audioRef.current.play(), 500);
        };
    }, [perms]);

    return (
        <audio ref={audioRef} loop>
            <source src={src} type="audio/mpeg" />
        </audio>
    );
}

export function ChangeMusicMute() {
    if (audio.current) {
        audio.current.muted = !audio.current.muted;
    }
}