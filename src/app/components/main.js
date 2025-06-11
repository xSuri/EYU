import { useSelector, useDispatch } from 'react-redux';
import { addMoneyPerSecond, buyBuilding, click } from '../store/index';

import { useState, useEffect } from 'react';
import End from './end';
import BottomMenu from '../utils/BottomMenu';
import PixelModal from '../utils/PixelModal';
import BackgroundMusic from '../utils/Music';

export default function Main() {
    const [gameEnded, setGameEnded] = useState(false);
    const [openShopModal, setOpenShopModal] = useState(false);

    const [audio, setAudio] = useState({
        soundSrc: '',
        clickedButton: false,
    });

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleHouseClick = (houseName, amount) => {
        dispatch(buyBuilding({ houseName, amount }));
        if( user.cash >= amount) setAudio({ soundSrc: '/sounds/buy_building.wav', clickedButton: true });
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

    const houses = user.bought.buildings;

    useEffect(() => {
        const moneyPerSec = setInterval(() => dispatch(addMoneyPerSecond()), 1000);
        return () => clearInterval(moneyPerSec);
    }, [user.cashPerSecond]);

    return (
        <>
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
                    ></div>

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
                                    width: `${128 / 1920 * 100}%`,
                                    height: `${256 / 1080 * 100}%`,
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
                                            {`${(index + 1) * 200}$`}
                                        </span>
                                    )
                                }
                                <img
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
                                    onClick={() => houses[house] ? null : handleHouseClick(house, (index + 1) * 200)}
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
                                    width: `${192 / 1920 * 100}vw`,
                                    height: `${320 / 1080 * 100}vh`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
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
                                    onClick={handleBankClick}
                                />
                            </div>

                            <div
                                style={{
                                    width: `${128 / 1920 * 100}vw`,
                                    height: `${256 / 1080 * 100}vh`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={`/images/${user.level}/house.png`}
                                    className="shop"
                                    alt="Shop"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        cursor: 'pointer',
                                        zIndex: 1,
                                    }}
                                    onClick={handleOpenShopModal}
                                />
                            </div>
                        </div>
                    </>

                    <BottomMenu />
                    <PixelModal onClose={handleCloseShopModal} open={openShopModal} title="Sklep" gameEnded={gameEnded} setGameEnded={setGameEnded} />

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