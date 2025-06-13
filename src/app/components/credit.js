const labelStyle = {
  fontFamily: "'Press Start 2P', 'VT323', monospace",
  fontSize: "34px",
  color: "#ce254b",
  letterSpacing: "4px",
  textShadow: "0 2px 0 #21091e, 2px 0 #21091e, 0 -2px 0 #21091e, -2px 0 #21091e",
  marginBottom: "30px",
  marginTop: "20px",
  textAlign: "center"
};

const boxStyle = {
  margin: "0 auto",
  padding: "38px 36px 28px 36px",
  background: "rgba(30, 40, 60, 0.93)",
  border: "4px solid #4e5970",
  borderRadius: "18px",
  maxWidth: "480px",
  minWidth: "480px",
  boxShadow: "0 12px 32px #0006",
  color: "#fff",
  fontFamily: "'Press Start 2P', 'VT323', monospace",
  fontSize: "17px",
  textAlign: "center",
  position: "relative"
};

const closeBtnStyle = {
  position: "absolute",
  top: 16,
  right: 24,
  background: "#2e3454",
  color: "#fff",
  border: "none",
  borderRadius: "7px",
  fontSize: "28px",
  width: "38px",
  height: "38px",
  cursor: "pointer",
  fontFamily: "inherit",
  boxShadow: "0 2px 0 #1d1e2a",
  lineHeight: "38px"
};

export default function Credit({ open, onClose }) {
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
      <div style={boxStyle}>
        <button onClick={() => onClose(false)} style={closeBtnStyle}>×</button>
        <div style={labelStyle}>CREDITS</div>
        <div style={{ marginBottom: 22 }}>
          <span style={{ color: "#e9e968" }}>Project Management</span><br />
          Hubert &apos;xsuri&apos; Kucharzak
          <br />
        </div>
        <div style={{ marginBottom: 22 }}>
          <span style={{ color: "#e9e968" }}>Programming</span><br />
          Hubert &apos;xsuri&apos; Kucharzak
        </div>
        <div style={{ marginBottom: 22 }}>
          <span style={{ color: "#e9e968" }}>Game Design</span><br />
          Hubert &apos;xsuri&apos; Kucharzak
          <br />
          Dawid Potykanowicz
          <br />
          Szymon Gerszendorf
        </div>
        <div style={{ marginBottom: 22 }}>
          <span style={{ color: "#e9e968" }}>Art & Animation</span><br />
          Dawid Potykanowicz
        </div>
        <div style={{ marginBottom: 22 }}>
          <span style={{ color: "#e9e968" }}>Music & SFX</span><br />
          Szymon Gerszendorf
        </div>
        <div style={{ marginBottom: 22 }}>
          <span style={{ color: "#e9e968" }}>Special Thanks</span><br />
          Julia Włodarczyk
        </div>
        <div style={{
          fontSize: "13px",
          letterSpacing: "2px",
          opacity: 0.7,
          marginTop: 36,
          color: "#bdbdbd"
        }}>
          Expand Your Universe &copy; 2025
        </div>
        <div style={{
          fontSize: "11px",
          letterSpacing: "2px",
          opacity: 0.65,
          marginTop: 12,
          color: "#bdbdbd",
          fontFamily: "'Press Start 2P', 'VT323', monospace"
        }}>
          Font: Press Start 2P by codeman38
        </div>
      </div>
    </div>
  );
}