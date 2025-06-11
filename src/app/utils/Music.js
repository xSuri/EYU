import { useRef, useEffect, use } from 'react';
import { usePermission } from '../PermissionContext';

let audio;

export default function BackgroundMusic({ src, timeout, volume = 0.1 }) {
    const audioRef = useRef(null);
    const { perms } = usePermission();

    useEffect(() => {
        audio = audioRef;

        if(perms){
            setTimeout(() => audioRef.current.play(), timeout || 500);
        };
    }, [perms]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []);

    return (
        <audio ref={audioRef}  loop>
            <source src={src} type="audio/mpeg" />
        </audio>
    );
}

export function ChangeMusicMute() {
    if (audio.current) {
        audio.current.muted = !audio.current.muted;
    }
}