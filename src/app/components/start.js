'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import InteractiveButton from '../utils/Interactive-Button';
import BackgroundMusic, { ChangeMusicMute } from '../utils/Music';
import MusicPermission from '../utils/Music-Perm-Modal';
import { usePermission } from '../PermissionContext';
import Credit from './credit';

export default function StartScreen({ onStart }) {
    const [muteSounds, setMuteSounds] = useState(false);
    const { perms } = usePermission();

    const [showStart, setShowStart] = useState(true);
    const [showCredit, setShowCredit] = useState(false);

    const [audio, setAudio] = useState({
        soundSrc: '',
        clickedButton: false,
    });

    const handleStart = () => {
        setShowStart(false);
        onStart();
    };

    const handleShowCredit = () => {
        setShowCredit(true);
        setShowStart(true);
    };

    const handleHideCredit = () => {
        setShowCredit(false);
        setAudio({ soundSrc: '/sounds/click_button.ogg', clickedButton: true });
    };

    const setSoundStatus = (mute) => {
        setMuteSounds(mute);
        ChangeMusicMute();
    }

    useEffect(() => {
        if (!perms) setMuteSounds(true);
        else setMuteSounds(false);
    }, [perms]);


    return (
        <>
            {
                perms === null ? (<MusicPermission />) : (
                    <div
                        className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden"
                        style={{
                            backgroundImage: 'url(/images/utils/background.gif)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <BackgroundMusic src="/sounds/main_menu_music.wav" volume={0.05} />

                        <div className="absolute inset-0 bg-gray-900 opacity-50" />

                        <div className="z-10 text-center text-white font-mono">

                            {
                                showCredit ? (<Credit open={showCredit} onClose={handleHideCredit} />) : (
                                    showStart ? (
                                        <div className="flex flex-col gap-4 items-center" >
                                            <div className="relative">
                                                <InteractiveButton src="/images/utils/button_start.png" sound={true} soundSrc='/sounds/click_button.ogg' onClick={handleStart} />

                                                <div className="absolute top-0 right-[-3rem]">
                                                    {muteSounds ? (
                                                        <InteractiveButton
                                                            src="/images/utils/button_off.png"
                                                            onClick={() => setSoundStatus(false)}
                                                            styleWidthHeight="w-12 h-12"
                                                            sound={true}
                                                            soundSrc='/sounds/click_button.ogg'
                                                        />
                                                    ) : (
                                                        <InteractiveButton
                                                            src="/images/utils/button_on.png"
                                                            onClick={() => setSoundStatus(true)}
                                                            styleWidthHeight="w-12 h-12"
                                                            sound={true}
                                                            soundSrc='/sounds/click_button.ogg'
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <InteractiveButton
                                                src="/images/utils/button_credit.png"
                                                onClick={handleShowCredit}
                                                sound={true}
                                                soundSrc='/sounds/click_button.ogg'
                                            />
                                        </div>
                                    ) :
                                        showCredit ? null : ((
                                            <p className="mt-10 text-gray-300 animate-pulse text-lg flex flex-col items-center gap-2">
                                                Loading...
                                                <Image src="/images/utils/dolar.gif" width={50} height={50} alt="Loading icon" />
                                            </p>
                                        ))

                                )
                            }
                        </div>

                        {audio.clickedButton && audio.soundSrc && (
                            <audio
                                src={audio.soundSrc}
                                autoPlay
                                volume={1}
                                onEnded={() => setAudio({ soundSrc: '', clickedButton: false })}
                            />
                        )}
                    </div >
                )
            }
        </>
    );
};