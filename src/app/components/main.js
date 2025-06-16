import { useSelector, useDispatch } from 'react-redux';
import { addMoneyPerSecond, buyBuilding, click, loadGame, saveGame } from '../store/index';

import { useState, useEffect, useRef } from 'react';
import End from './end';
import BottomMenu from '../utils/BottomMenu';
import PixelModal from '../utils/PixelModal';
import BackgroundMusic, { ChangeMusicMute } from '../utils/Music';
import InteractiveButton from '../utils/Interactive-Button';
import Image from 'next/image';
import SaveLoadModal from '../utils/Save-Load-Game-Modal';

export default function Main() {
    const timeoutRef = useRef();

    const [muteSounds, setMuteSounds] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [openShopModal, setOpenShopModal] = useState(false);
    const [saveLoadModal, setSaveLoadModal] = useState(false);
    const [showGif, setShowGif] = useState(false);
    const [gifOffset, setGifOffset] = useState(0);

    const [audio, setAudio] = useState({
        soundSrc: '',
        clickedButton: false,
    });

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const getBase64 = () => {
        try {
            return btoa(unescape(encodeURIComponent(JSON.stringify(user))));
        } catch {
            return '';
        }
    };

    const setSoundStatus = (mute) => {
        setMuteSounds(mute);
        ChangeMusicMute();
    }

    const handleHouseClick = (houseName, amount) => {
        dispatch(buyBuilding({ houseName, amount }));
        if (user.cash >= amount) setAudio({ soundSrc: '/sounds/buy_building.wav', clickedButton: true });
    };

    const handleOpenShopModal = () => {
        setOpenShopModal(true);
        setAudio({ soundSrc: '/sounds/click_button.ogg', clickedButton: true });
    }

    const handleCloseShopModal = () => {
        setOpenShopModal(false);
        setAudio({ soundSrc: '/sounds/click_button.ogg', clickedButton: true });
    }

    const handleBankClick = () => {
        dispatch(click());
        setAudio({ soundSrc: '/sounds/get_money.wav', clickedButton: true });
    };


    const onBankClick = (e) => {
        handleBankClick(e);

        setGifOffset(Math.floor(Math.random() * 60) - 30);
        setShowGif(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setShowGif(false);
            timeoutRef.current = null;
        }, 1500);
    };

    const houses = user.bought.buildings;

    useEffect(() => {
        const moneyPerSec = setInterval(() => dispatch(addMoneyPerSecond()), 1000);
        return () => clearInterval(moneyPerSec);
    }, [user.cashPerSecond, dispatch]);

    return (
        <>
            <div className="fixed top-4 left-4 z-[999]">
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

            <div className="fixed bottom-4 left-4 z-[999]">
                <InteractiveButton
                    src="/images/utils/save_game.png"
                    onClick={() => setSaveLoadModal(true)}
                    styleWidthHeight="w-12 h-12 brightness-75 hover:brightness-110 transition"
                    sound={true}
                    soundSrc="/sounds/click_button.ogg"
                />
            </div>

            {gameEnded ? (<End />) : (

                <div
                    style={{
                        position: 'relative',
                        width: '100vw',
                        height: '100vh',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(/images/${user.level}/1920x1080.png)`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />

                    {
                        Object.keys(houses).map((house, index) => (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: `${(Math.floor(index / 6) * 600 + 25) / 1080 * 100
                                        }%`,
                                    left: `${(index < 6
                                        ? (Math.floor(index / 2) * 700 + (index % 2 === 0 ? 150 : 350)) - 50
                                        : (Math.floor((index - 6) / 2) * 700 + ((index % 2 === 0) ? 150 : 350) + (index >= 8 ? 700 : 0)) - 50
                                    ) / 1920 * 100
                                        }%`,
                                    width: `${144 / 1920 * 100}%`,
                                    height: `${288 / 1080 * 100}%`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}
                                key={index}
                            >
                                {
                                    houses[house] ? (<></>) : (
                                        <span
                                            style={{
                                                position: 'absolute',
                                                zIndex: 2,
                                                color: 'white',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                textShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)',
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            {`${((index + 1) * 400) * 2.5}$`}
                                        </span>
                                    )
                                }
                                <Image
                                    src={`/images/${user.level}/domeklvl${user.upgrades.building_upgrades[house].level}.png`}
                                    alt={'House ' + (index + 1)}
                                    className={houses[house] ? '' : 'inactive-house'}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        cursor: houses[house] ? 'default' : 'pointer',
                                        zIndex: 1,
                                        filter: houses[house] ? 'brightness(1)' : 'brightness(0.4)',
                                    }}
                                    width={144}
                                    height={288}
                                    onClick={() => houses[house] ? null : handleHouseClick(house, ((index + 1) * 400) * 2.5)}
                                />
                            </div>
                        ))
                    }

                    <>
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                gap: '128px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: `${240 / 1920 * 100}vw`,
                                    height: `${400 / 1080 * 100}vh`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <Image
                                    src={`/images/${user.level}/bank.png`}
                                    alt="Bank"
                                    className="bank"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        cursor: 'pointer',
                                        zIndex: 1,
                                    }}
                                    width={240}
                                    height={400}
                                    onClick={onBankClick}
                                />
                                {showGif && (
                                    <img
                                        src="/images/utils/dolar.gif"
                                        alt="Dolar animation"
                                        style={{
                                            position: 'absolute',
                                            left: `calc(50% + ${gifOffset}px)`,
                                            top: '10%',
                                            transform: 'translate(-50%, -100%)',
                                            width: 40,
                                            height: 40,
                                            pointerEvents: 'none',
                                            zIndex: 2,
                                            filter: 'drop-shadow(0 2px 6px #0008)'
                                        }}
                                    />
                                )}
                            </div>

                            <div
                                style={{
                                    width: `${160 / 1920 * 100}vw`,
                                    height: `${320 / 1080 * 100}vh`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    src={`/images/${user.level}/market.png`}
                                    className="shop"
                                    alt="Shop"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        cursor: 'pointer',
                                        zIndex: 1,
                                    }}
                                    width={160}
                                    height={320}
                                    onClick={handleOpenShopModal}
                                />
                            </div>
                        </div>
                    </>

                    <BottomMenu />

                    <PixelModal onClose={handleCloseShopModal} open={openShopModal} title="Sklep" gameEnded={gameEnded} setGameEnded={setGameEnded} />

                    <SaveLoadModal
                        isOpen={saveLoadModal}
                        onClose={() => setSaveLoadModal(false)}
                        saveString={getBase64()}
                        onLoad={base64 => {
                            dispatch(loadGame(base64));
                            setSaveLoadModal(false);
                        }}
                    />

                    {audio.clickedButton && audio.soundSrc && (
                        <audio
                            src={audio.soundSrc}
                            autoPlay
                            volume={1}
                            onEnded={() => setAudio({ soundSrc: '', clickedButton: false })}
                        />
                    )}

                    <BackgroundMusic src="/sounds/main_playing_music.wav" volume={0.02} />
                </div>

            )}
        </>);
}