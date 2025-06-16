const labelStyle = {
    fontFamily: "'Press Start 2P', 'VT323', monospace",
    fontSize: "40px",
    color: "#ce254b",
    letterSpacing: "4px",
    textShadow: "0 2.5px 0 #21091e, 2.5px 0 #21091e, 0 -2.5px 0 #21091e, -2.5px 0 #21091e",
    marginBottom: "36px",
    marginTop: "28px",
    textAlign: "center"
};

const boxStyle = {
    margin: "0 auto",
    padding: "56px 54px 38px 54px",
    background: "rgba(30, 40, 60, 0.93)",
    border: "4px solid #4e5970",
    borderRadius: "22px",
    maxWidth: "640px",
    minWidth: "580px",
    maxHeight: "88vh",
    boxShadow: "0 16px 48px #0008",
    color: "#fff",
    fontFamily: "'Press Start 2P', 'VT323', monospace",
    fontSize: "20px",
    textAlign: "center",
    position: "relative",
    overflowY: "auto",
    scrollbarColor: "#4e5970 #222b3a",
    scrollbarWidth: "thin"
};

const closeBtnStyle = {
    position: "absolute",
    top: 22,
    right: 32,
    background: "#2e3454",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "32px",
    width: "44px",
    height: "44px",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 2px 0 #1d1e2a",
    lineHeight: "44px"
};

const customScrollStyle = `
  .controls-modal-scroll::-webkit-scrollbar {
    width: 14px;
    background: #222b3a;
    border-radius: 10px;
  }
  .controls-modal-scroll::-webkit-scrollbar-thumb {
    background: #4e5970;
    border-radius: 10px;
    border: 2px solid #222b3a;
  }
`;

export default function Controls({ open, onClose }) {
    if (!open) return null;

    return (
        <div style={{
            position: "fixed",
            left: 0, top: 0, width: "100vw", height: "100vh",
            background: "rgba(18, 17, 30, 0.72)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <style>{customScrollStyle}</style>
            <div style={boxStyle} className="controls-modal-scroll">
                <button onClick={() => onClose(false)} style={closeBtnStyle}>×</button>

                <div style={labelStyle}>History</div>
                <div style={{ marginBottom: 28 }}>
                    Your adventure begins with one click. Earth is just the beginning. Take on the role of an ambitious colony developer who builds an economic empire from scratch on three planets: Earth, Mars, and the Moon. Collect cash, invest in buildings, upgrade your structures, and watch your universe grow with each click. In the game, you decide whether to play with relaxing 8-bit music or in silence.
                </div>
                <div style={{ marginBottom: 28 }}>
                    You have complete control over your journey — from the first coin on Earth to the last house on the Moon. When you buy all the buildings, upgrade them to the maximum, and get the required cash – it’s time to end the journey. Top it off with a screen that says one thing: you succeeded — your universe has reached its full potential.
                </div>
                <div style={{ marginBottom: 28 }}>
                    <span style={{ color: "#e9e968" }}>Ready?</span><br />
                    Click Start and… Expand Your Universe.
                </div>

                <div style={labelStyle}>Controls</div>
                <div style={{ marginBottom: 24, textAlign: "left" }}>
                    <ul style={{ paddingLeft: 24 }}>
                        <li>
                            <b>Bank icon (center):</b> Click this icon to collect funds. Each click increases your cash.
                        </li>
                        <li>
                            <b>Screen icon (top right):</b> Click to enlarge or shrink the game window (toggle fullscreen).
                        </li>
                        <li>
                            <b>Market icon (center right):</b> Click to open the market screen, where you can buy upgrades. To upgrade a building, you must first click on it and purchase it.
                        </li>
                        <li>
                            <b>Mute/Sound icon (top left):</b> Toggle sound and music on or off.
                        </li>
                    </ul>
                </div>
                <div style={{ marginBottom: 18, textAlign: "left", fontSize: "15px", opacity: 0.75 }}>
                    Navigate through the interface by clicking the icons. All actions are performed with the mouse.
                </div>
                <div style={{ marginBottom: 18, textAlign: "left", fontSize: "15px", opacity: 0.75 }}>
                    If you want use commands, press <b>~</b> to open the command bar. Type your command and press <b>Enter</b> to execute it (help command is available, result you can see on the <b>console (f12)</b>).
                </div>
                <div style={{
                    fontSize: "15px",
                    letterSpacing: "2px",
                    opacity: 0.7,
                    marginTop: 40,
                    color: "#bdbdbd"
                }}>
                    Expand Your Universe &copy; 2025
                </div>
            </div>
        </div>
    );
}