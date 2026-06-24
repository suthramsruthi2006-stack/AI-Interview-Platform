function Footer() {
  return (
    <footer
      style={{
        background: "#1e293b",
        color: "white",
        textAlign: "center",
        padding: "15px",
        marginTop: "50px",
      }}
    >
      <p>
        © 2026 AI Interview Platform
      </p>

      <p
        style={{
          color: "#cbd5e1",
          fontSize: "14px",
        }}
      >
        Built with React + FastAPI + Gemini AI
      </p>
    </footer>
  );
}

export default Footer;