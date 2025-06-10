import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyUpgrade, buyBuildingUpgrade, changeCash, changeLevel } from "../store/index";

const upgradePrices = {
    more_cash_per_click: [200, 500, 1200],
    more_cash_per_second: [300, 800, 1600],
};
const buildingUpgradeBasePrice = 100;
const buildingUpgradeMultiplier = 1.6;
function getBuildingUpgradePrice(level) {
    return Math.round(buildingUpgradeBasePrice * Math.pow(buildingUpgradeMultiplier, level - 1));
}

const upgradeDisplayNames = {
    more_cash_per_click: "Cash per click",
    more_cash_per_second: "Cash per second multiplier",
};
const levels = ["first", "second", "third"];

const cashPerClickBonuses = [1, 3, 7];
const cashPerSecondMultipliers = [2, 3, 5];

const planetUpgradePrices = [500000, 5000000];
const planetNames = ["earth", "moon", "mars"];
const planetDisplayNames = ["Earth", "Moon", "Mars"];

export default function PixelUpgradeModal({ open, onClose }) {
    const [gameEnded, setGameEnded] = useState(false);
    const upgrades = useSelector((state) => state.user.upgrades);
    const boughtBuildings = useSelector((state) => state.user.bought.buildings);
    const cash = useSelector((state) => state.user.cash);
    const cashPerSecondMultiplier = useSelector((state) => state.user.cashPerSecondMultiplier);
    const levelNumber = useSelector((state) => state.user.levelNumber);
    const dispatch = useDispatch();

    if (!open) return null;

    const nextLevelNumber = levelNumber + 1;
    const hasNextLevel = nextLevelNumber < planetNames.length;
    const nextPlanetPrice = planetUpgradePrices[levelNumber] || null;
    const nextPlanetDisplay = planetDisplayNames[nextLevelNumber];

    const isOnMars = planetNames[levelNumber] === "mars";
    const endGamePrice = 10_000_000;
    const canEndGame = cash >= endGamePrice;

    return (
        <div style={{
            position: "fixed",
            zIndex: 1000,
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(30, 40, 60, 0.30)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Press Start 2P', 'VT323', monospace",
        }}>
            <div style={{
                minWidth: 480,
                maxWidth: 600,
                width: "60vw",
                background: "#e2e2c6",
                border: "6px solid #444a32",
                boxShadow: "0 8px 32px #0008",
                borderRadius: 16,
                padding: "28px 18px 22px 18px",
                color: "#222",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 14,
                        background: "#444a32",
                        color: "#fff",
                        fontFamily: "inherit",
                        fontSize: 20,
                        padding: "2px 10px",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        boxShadow: "0 2px 0 #222a",
                    }}
                >
                    ×
                </button>
                <div style={{
                    fontSize: 20,
                    marginBottom: 19,
                    fontWeight: "bold",
                    color: "#fff",
                    letterSpacing: 1,
                    textShadow: "0 2px 0 #222a",
                    background: "#444a32",
                    padding: "7px 22px",
                    borderRadius: 8,
                    border: "2px solid #222",
                    boxShadow: "0 1px 0 #222a",
                    display: "inline-block",
                }}>
                    Upgrades
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "22px",
                    justifyContent: "center",
                    marginBottom: 22,
                    flexWrap: "wrap",
                    width: "100%",
                }}>
                    {Object.keys(upgradeDisplayNames).map((key) => (
                        <div key={key} style={{
                            background: "#d5deb0",
                            border: "2px solid #4d543a",
                            borderRadius: 14,
                            padding: "10px 22px 12px 22px",
                            width: 310,
                            margin: "0 auto",
                            marginBottom: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                            <div style={{
                                fontWeight: 600,
                                color: "#222",
                                marginBottom: 7,
                                fontSize: 18,
                                fontFamily: "inherit",
                                letterSpacing: 1,
                            }}>
                                {upgradeDisplayNames[key]}
                            </div>
                            <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
                                {levels.map((lvl, idx) => {
                                    const bought = upgrades[key][lvl];
                                    const price = upgradePrices[key][idx];
                                    const prevBought = idx === 0 ? true : upgrades[key][levels[idx - 1]];
                                    const canBuy = !bought && prevBought && cash >= price;

                                    let levelLabel = "";
                                    if (key === "more_cash_per_click") {
                                        levelLabel = `+${cashPerClickBonuses[idx]}`;
                                    } else if (key === "more_cash_per_second") {
                                        levelLabel = `x${cashPerSecondMultipliers[idx]}`;
                                    }
                                    return (
                                        <div key={lvl} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <button
                                                disabled={!canBuy}
                                                onClick={() => {
                                                    dispatch(changeCash(-price));
                                                    dispatch(buyUpgrade({ type: key, level: lvl }));
                                                }}
                                                style={{
                                                    width: 46,
                                                    height: 46,
                                                    borderRadius: 10,
                                                    border: "2px solid #35572b",
                                                    background: bought
                                                        ? "#7ab179"
                                                        : canBuy
                                                            ? "#97e596"
                                                            : "#78a478",
                                                    color: bought ? "#fff" : "#222",
                                                    fontWeight: "bold",
                                                    fontSize: 16,
                                                    fontFamily: "inherit",
                                                    cursor: bought ? "not-allowed" : canBuy ? "pointer" : "not-allowed",
                                                    boxShadow: bought ? "0 2px 0 #35572b" : "none",
                                                    marginBottom: 3,
                                                    transition: "background .15s"
                                                }}
                                            >
                                                {levelLabel}
                                            </button>
                                            <span style={{
                                                fontFamily: "inherit",
                                                fontSize: 13,
                                                color: "#35572b",
                                                fontWeight: "bold",
                                                marginTop: 2
                                            }}>
                                                {price}$
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginBottom: 10,
                    fontWeight: "bold",
                    color: "#444a32",
                    fontSize: 15,
                }}>
                    Current cash per second multiplier: <span style={{ color: "#222" }}>x{cashPerSecondMultiplier}</span>
                </div>

                <div style={{
                    background: "#c8cc98",
                    border: "3px solid #444a32",
                    borderRadius: 10,
                    padding: "14px 8px",
                    width: "100%",
                    maxWidth: 570,
                    marginBottom: 9,
                }}>
                    <div style={{
                        fontWeight: "bold",
                        color: "#222",
                        marginBottom: 8,
                        fontSize: 15,
                        letterSpacing: 1,
                    }}>
                        Building Upgrades
                    </div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5,1fr)",
                        gap: 8,
                        justifyItems: "center"
                    }}>
                        {Object.entries(upgrades.building_upgrades).map(([house, { level }]) => {
                            const nextLevel = level + 1;
                            const price = getBuildingUpgradePrice(nextLevel);
                            const canAfford = cash >= price;
                            const isMax = level >= 3;
                            const isBought = boughtBuildings[house];
                            return (
                                <div
                                    key={house}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        background: !isBought
                                            ? "#aab1a2"
                                            : isMax
                                                ? "#bdbdbd"
                                                : canAfford
                                                    ? "#b5f7b7"
                                                    : "#69a46f",
                                        borderRadius: 8,
                                        padding: "2px 2px",
                                        transition: "background .2s"
                                    }}
                                >
                                    <button
                                        onClick={() => {
                                            dispatch(changeCash(-price));
                                            dispatch(buyBuildingUpgrade({ house, nextLevel }));
                                        }}
                                        disabled={!canAfford || isMax || !isBought}
                                        style={{
                                            background: "transparent",
                                            color: !isBought ? "#888" : isMax ? "#fff" : canAfford ? "#222" : "#eee",
                                            border: "2px solid #444a32",
                                            borderRadius: 6,
                                            padding: "7px 0 5px 0",
                                            fontWeight: "bold",
                                            fontFamily: "inherit",
                                            fontSize: 13,
                                            width: 68,
                                            cursor: (!canAfford || isMax || !isBought) ? "not-allowed" : "pointer",
                                            marginBottom: 2,
                                            boxShadow: "0 1px 0 #2221",
                                            outline: "none"
                                        }}
                                    >
                                        {house.replace("_", " ").toUpperCase()}
                                        <br />
                                        <span style={{
                                            fontSize: 11,
                                            color: "#444"
                                        }}>
                                            lvl {level}
                                        </span>
                                    </button>
                                    <span style={{
                                        fontSize: 12,
                                        color: "#222",
                                        fontWeight: "bold",
                                        background: "#e2e2c6",
                                        borderRadius: 4,
                                        padding: "2px 8px",
                                        marginTop: 1,
                                        letterSpacing: 1,
                                        border: "1px solid #bdbdbd"
                                    }}>
                                        {!isBought ? "Buy building" : isMax ? "MAX" : `${price}$`}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{
                    marginTop: 18,
                    marginBottom: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%"
                }}>
                    {!gameEnded && !isOnMars && (
                        <React.Fragment>
                            <button
                                disabled={cash < nextPlanetPrice}
                                onClick={() => {
                                    dispatch(changeCash(-nextPlanetPrice));
                                    dispatch(changeLevel(nextLevelNumber));
                                }}
                                style={{
                                    background: cash >= nextPlanetPrice ? "#7ab179" : "#bdbdbd",
                                    color: "#222",
                                    borderRadius: 12,
                                    border: "2px solid #35572b",
                                    fontWeight: "bold",
                                    fontFamily: "inherit",
                                    fontSize: 18,
                                    padding: "12px 30px",
                                    marginBottom: 6,
                                    marginTop: 3,
                                    cursor: cash >= nextPlanetPrice ? "pointer" : "not-allowed",
                                    boxShadow: cash >= nextPlanetPrice ? "0 2px 0 #35572b" : "none",
                                    transition: "background .15s"
                                }}
                            >
                                {`Travel to ${nextPlanetDisplay}`}
                            </button>
                            <span style={{
                                color: "#35572b",
                                fontWeight: "bold",
                                fontSize: 15,
                            }}>
                                {nextPlanetPrice}$ required
                            </span>
                        </React.Fragment>
                    )}
                    {!gameEnded && isOnMars && (
                        <React.Fragment>
                            <button
                                disabled={!canEndGame}
                                onClick={() => setGameEnded(true)}
                                style={{
                                    background: canEndGame ? "#ec6262" : "#bdbdbd",
                                    color: "#fff",
                                    borderRadius: 12,
                                    border: "2px solid #a83232",
                                    fontWeight: "bold",
                                    fontFamily: "inherit",
                                    fontSize: 18,
                                    padding: "12px 30px",
                                    marginBottom: 6,
                                    marginTop: 3,
                                    cursor: canEndGame ? "pointer" : "not-allowed",
                                    boxShadow: canEndGame ? "0 2px 0 #a83232" : "none",
                                    transition: "background .15s"
                                }}
                            >
                                End Game
                            </button>
                            <span style={{
                                color: "#a83232",
                                fontWeight: "bold",
                                fontSize: 15,
                            }}>
                                {endGamePrice}$ required
                            </span>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}