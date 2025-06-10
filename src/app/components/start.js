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

    const handleStart = () => {
        setShowStart(false);
        onStart();
    };

    const handleCredit = () => {
        setShowCredit(true);
        setShowStart(true);
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
                        <BackgroundMusic src="/music/earth/music.wav" />

                        <div className="absolute inset-0 bg-gray-900 opacity-50" />

                        <div className="z-10 text-center text-white font-mono">

                            {
                                showCredit ? (<Credit  open={showCredit} onClose={setShowCredit}/>) : (
                                    showStart ? (
                                        <div className="flex flex-col gap-4 items-center" >
                                            <div className="relative">
                                                <InteractiveButton src="/images/utils/button_start.png" onClick={handleStart} />

                                                <div className="absolute top-0 right-[-3rem]">
                                                    {muteSounds ? (
                                                        <InteractiveButton
                                                            src="/images/utils/button_off.png"
                                                            onClick={() => setSoundStatus(false)}
                                                            styleWidthHeight="w-12 h-12"
                                                        />
                                                    ) : (
                                                        <InteractiveButton
                                                            src="/images/utils/button_on.png"
                                                            onClick={() => setSoundStatus(true)}
                                                            styleWidthHeight="w-12 h-12"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <InteractiveButton
                                                src="/images/utils/button_credit.png"
                                                onClick={handleCredit}
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
                    </div >
                )
            }
        </>
    );
};