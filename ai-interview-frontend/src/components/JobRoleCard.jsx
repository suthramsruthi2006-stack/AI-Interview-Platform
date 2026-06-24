import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JobRoleCard() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const loadRoles = async () => {
    try {
      const response = await axios.get(
        "https://ai-interview-backend-oxvw.onrender.com/jobroles/"
      );

      console.log("Job Roles:", response.data);

      setRoles(
        response.data.recommended_jobs || []
      );
    } catch (error) {
      console.error(error);
      alert("Failed to load job roles");
    }
  };

  const selectRole = (role) => {
    localStorage.setItem(
      "selectedRole",
      role
    );

    console.log(
      "Selected Role Saved:",
      localStorage.getItem("selectedRole")
    );

    alert(`${role} selected`);

    navigate("/interview");
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Recommended Job Roles</h2>

      <button
        onClick={loadRoles}
        style={{
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Load Recommended Jobs
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {roles.map((role, index) => (
          <div
            key={index}
            style={{
              background: "#ffffff",
              borderRadius: "15px",
              padding: "25px",
              boxShadow:
                "0px 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                color: "#1e293b",
                marginBottom: "20px",
              }}
            >
              {role}
            </h3>

            <button
              onClick={() => selectRole(role)}
              style={{
                background: "#10b981",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Select Role
            </button>
          </div>
        ))}
      </div>

      {roles.length === 0 && (
        <p
          style={{
            marginTop: "20px",
            color: "#64748b",
          }}
        >
          Click "Load Recommended Jobs" to view job roles.
        </p>
      )}
    </div>
  );
}

export default JobRoleCard;