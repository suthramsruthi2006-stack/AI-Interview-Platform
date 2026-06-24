import React, { useState } from "react";
import axios from "axios";

function ReportCard() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  const getReports = async () => {
    try {
      const response = await axios.get(
        "https://ai-interview-backend-oxvw.onrender.com/interview/reports"
      );

      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setReports(response.data);
      } else if (response.data.reports) {
        setReports(response.data.reports);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      alert("Failed to load reports");
    }
  };

  const filteredReports = Array.isArray(reports)
    ? reports.filter((report) =>
        report.role?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e293b",
          marginBottom: "25px",
        }}
      >
        📊 Interview Reports
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search by role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={getReports}
          style={{
            padding: "12px 25px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Load Reports
        </button>

        <button
          onClick={() =>
            window.open(
              "https://ai-interview-backend-oxvw.onrender.com/report/download",
              "_blank"
            )
          }
          style={{
            padding: "12px 25px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Download PDF
        </button>
      </div>

      {filteredReports.length > 0 ? (
        <div
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#e2e8f0",
                }}
              >
                <th style={{ padding: "12px" }}>Role</th>
                <th style={{ padding: "12px" }}>Technical</th>
                <th style={{ padding: "12px" }}>Communication</th>
                <th style={{ padding: "12px" }}>Overall</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Feedback</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report, index) => (
                <tr
                  key={index}
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <td style={{ padding: "12px" }}>
                    {report.role || "N/A"}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {report.technical_score ?? 0}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {report.communication_score ?? 0}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                      fontWeight: "bold",
                      color:
                        report.overall_score >= 7
                          ? "green"
                          : report.overall_score >= 5
                          ? "orange"
                          : "red",
                    }}
                  >
                    {report.overall_score ?? 0}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {report.overall_score >= 7
                      ? "✅ Excellent"
                      : report.overall_score >= 5
                      ? "⚠️ Average"
                      : "❌ Improve"}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {report.feedback || "No Feedback"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <p>No reports available.</p>
        </div>
      )}
    </div>
  );
}

export default ReportCard;