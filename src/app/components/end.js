export default function End({ }) {
  return (
    <div style={{
      position: "fixed",
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(18, 17, 30, 0.86)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <div style={{
        background: "rgba(30, 40, 60, 0.93)",
        border: "4px solid #4e5970",
        borderRadius: 18,
        boxShadow: "0 12px 32px #0006",
        maxWidth: 600,
        minWidth: 350,
        padding: "54px 40px 38px 40px",
        textAlign: "center",
        fontFamily: "'Press Start 2P', 'VT323', monospace",
        color: "#fff",
        position: "relative"
      }}>
        <div style={{
          fontSize: 38,
          color: "#ce254b",
          letterSpacing: "6px",
          textShadow: "0 2px 0 #21091e, 2px 0 #21091e, 0 -2px 0 #21091e, -2px 0 #21091e",
          fontWeight: "bold",
          marginBottom: 34
        }}>
          CONGRATULATIONS!
        </div>
        <div style={{
          fontSize: 23,
          color: "#e9e968",
          marginBottom: 22,
          letterSpacing: 1
        }}>
          You have expanded your universe<br />to its fullest potential.
        </div>
        <div style={{
          fontSize: 16,
          color: "#fff",
          marginBottom: 34,
          opacity: 0.88
        }}>
          All planets have been colonized.<br />
          Your legacy will live among the stars.<br />
          <span style={{ color: "#a5b8d1" }}>Thank you for playing!</span>
        </div>
        <div style={{
          fontSize: 13,
          color: "#bdbdbd",
          opacity: 0.6,
          marginTop: 42,
          letterSpacing: 2
        }}>
          Expand Your Universe &copy; 2025
        </div>
        <div style={{
          fontSize: 11,
          color: "#bdbdbd",
          opacity: 0.55,
          marginTop: 8,
          letterSpacing: 2
        }}>
          Font: Press Start 2P by codeman38
        </div>
      </div>
    </div>
  );
}