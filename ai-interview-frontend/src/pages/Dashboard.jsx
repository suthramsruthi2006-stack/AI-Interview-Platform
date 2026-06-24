import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    total_interviews: 0,
    average_score: 0,
    highest_score: 0,
    lowest_score: 0,
  });

  const name =
    localStorage.getItem("name") || "User";

  const role =
    localStorage.getItem("selectedRole") ||
    "Not Selected";

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "https://ai-interview-backend-oxvw.onrender.com/reports/stats"
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🚀 AI Interview Platform</h1>
      </div>

      <h2>Welcome, {name}</h2>

      <p>
        Practice interviews, improve skills,
        and track your performance.
      </p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>🎯</h3>
          <h2>{role}</h2>
          <p>Selected Role</p>
        </div>

        <div className="stat-card">
          <h3>🎤</h3>
          <h2>{stats.total_interviews}</h2>
          <p>Total Interviews</p>
        </div>

        <div className="stat-card">
          <h3>📈</h3>
          <h2>{stats.average_score}</h2>
          <p>Average Score</p>
        </div>

        <div className="stat-card">
          <h3>🏆</h3>
          <h2>{stats.highest_score}</h2>
          <p>Highest Score</p>
        </div>
      </div>

      <div className="card-container">
        <Link
          to="/resume-upload"
          className="card"
        >
          <h3>📄</h3>
          <h2>Upload Resume</h2>
          <p>Upload and analyze resume</p>
        </Link>

        <Link
          to="/jobroles"
          className="card"
        >
          <h3>💼</h3>
          <h2>Job Roles</h2>
          <p>Recommended careers</p>
        </Link>

        <Link
          to="/interview"
          className="card"
        >
          <h3>🎤</h3>
          <h2>Interview</h2>
          <p>Start mock interview</p>
        </Link>

        <Link
          to="/reports"
          className="card"
        >
          <h3>📊</h3>
          <h2>Reports</h2>
          <p>View performance history</p>
        </Link>

        <Link
          to="/profile"
          className="card"
        >
          <h3>👤</h3>
          <h2>Profile</h2>
          <p>Manage account details</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;