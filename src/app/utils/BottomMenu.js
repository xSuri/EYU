import React, { useState } from "react";
import { useSelector } from "react-redux";

function BottomMenu() {
    const [open, setOpen] = useState(false);

    const user = useSelector((state) => state.user);

    return (
        <div>
            <div
                style={{
                    position: "fixed",
                    bottom: 28,
                    right: 28,
                    zIndex: 100,
                    cursor: "pointer",
                    background: "#e2e2c6",
                    color: "#444a32",
                    borderRadius: "50%",
                    boxShadow: "0 2px 12px #2222",
                    width: 54,
                    height: 54,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "3px solid #444a32",
                    transition: "box-shadow 0.2s, background 0.18s",
                }}
                onClick={() => setOpen((o) => !o)}
                title="Show menu"
            >
                <span style={{
                    fontSize: 32,
                    transform: open ? "rotate(180deg)" : "none",
                    transition: "transform 0.18s",
                    color: "#444a32",
                    fontWeight: "bold"
                }}>▼</span>
            </div>

            {open && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 94,
                        right: 28,
                        width: 340,
                        background: "#e2e2c6",
                        color: "#222",
                        borderRadius: 16,
                        boxShadow: "0 8px 24px #2222",
                        padding: "20px 26px 18px 26px",
                        zIndex: 99,
                        border: "3px solid #444a32",
                        fontSize: "17px",
                        fontWeight: 400,
                        animation: "slideIn 0.24s",
                        fontFamily: "'Press Start 2P', 'VT323', monospace",
                    }}
                >
                    <div style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#444a32",
                        marginBottom: 8,
                        letterSpacing: 1,
                        textShadow: "0 2px 0 #bdbdbd80",
                    }}>
                        Cash: <span style={{color: "#222"}}>{user.cash}</span>
                    </div>
                    <div style={{ marginBottom: 2 }}>Planet: <span style={{fontWeight: "bold"}}>{user.level}</span></div>
                    <div style={{ marginBottom: 2 }}>Cash per click: <span style={{fontWeight: "bold"}}>{user.cashPerClick}</span></div>
                    <div style={{ marginBottom: 2 }}>Cash per second: <span style={{fontWeight: "bold"}}>{user.cashPerSecond}</span></div>
                    <div>Cash/sec Multiplier: <span style={{fontWeight: "bold"}}>x{user.cashPerSecondMultiplier}</span></div>
                </div>
            )}

            <style>
                {`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: none;}
        }
        `}
            </style>
        </div>
    );
}

export default BottomMenu;