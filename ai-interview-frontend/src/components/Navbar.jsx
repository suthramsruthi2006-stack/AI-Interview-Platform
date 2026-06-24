import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/forgot-password";

  if (hideNavbar) {
    return null;
  }

  return (
    <nav
      style={{
        background: "#1e293b",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          color: "white",
          margin: 0,
        }}
      >
        🚀 AI Interview Platform
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/resume-upload"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Resume
        </Link>

        <Link
          to="/jobroles"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Jobs
        </Link>

        <Link
          to="/interview"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Interview
        </Link>

        <Link
          to="/reports"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Reports
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Profile
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;