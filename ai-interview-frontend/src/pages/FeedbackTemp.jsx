import React from "react";

function FeedbackPage() {
  const data = JSON.parse(
    localStorage.getItem("feedbackData") || "{}"
  );

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
          maxWidth: "900px",
          margin: "auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0px 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e293b",
            marginBottom: "30px",
          }}
        >
          📊 Interview Feedback
        </h1>

        <div
          style={{
            background: "#e0f2fe",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>
            Overall Score: {data.overall_score || 0}/10
          </h2>

          <h3>
            Technical Score: {data.technical_score || 0}/10
          </h3>

          <h3>
            Communication Score: {data.communication_score || 0}/10
          </h3>

          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            <strong>Feedback:</strong>{" "}
            {data.feedback ||
              "No feedback available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;