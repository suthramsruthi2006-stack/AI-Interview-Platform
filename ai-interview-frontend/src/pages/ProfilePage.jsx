function ProfilePage() {
  const name =
    localStorage.getItem("name") || "User";

  const email =
    localStorage.getItem("email") ||
    "Not Available";

  const role =
    localStorage.getItem("selectedRole") ||
    "Not Selected";

  const totalInterviews =
    localStorage.getItem("totalInterviews") || 0;

  const averageScore =
    localStorage.getItem("averageScore") || "0/10";

  const highestScore =
    localStorage.getItem("highestScore") || "0/10";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0px 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "10px",
          }}
        >
          👤
        </div>

        <h1>User Profile</h1>

        <div
          style={{
            textAlign: "left",
            lineHeight: "2.5",
            fontSize: "18px",
          }}
        >
          <p>
            <strong>Name:</strong> {name}
          </p>

          <p>
            <strong>Email:</strong> {email}
          </p>

          <p>
            <strong>Selected Role:</strong>{" "}
            {role}
          </p>

          <p>
            <strong>Total Interviews:</strong>{" "}
            {totalInterviews}
          </p>

          <p>
            <strong>Average Score:</strong>{" "}
            {averageScore}
          </p>

          <p>
            <strong>Highest Score:</strong>{" "}
            {highestScore}
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          style={{
            marginTop: "30px",
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;