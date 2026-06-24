import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/resume/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResumeData(response.data);

      alert(
        "Resume Uploaded Successfully"
      );
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (job) => {
    localStorage.setItem(
      "selectedRole",
      job
    );

    alert(
      `${job} selected successfully`
    );

    navigate("/interview");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e293b",
          marginBottom: "20px",
        }}
      >
        📄 Resume Upload
      </h1>

      <div style={{ textAlign: "center" }}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br />
        <br />

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading
            ? "⏳ Uploading Resume..."
            : "📄 Upload Resume"}
        </button>
      </div>

      {resumeData && (
        <>
          <br />

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow:
                "0px 4px 15px rgba(0,0,0,0.1)",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#1e293b",
                marginBottom: "20px",
              }}
            >
              📊 Resume Analysis
            </h2>

            <p>
              <strong>
                🎓 Qualification:
              </strong>{" "}
              {resumeData.qualification ||
                "Not Available"}
            </p>

            <p>
              <strong>
                📈 Experience Score:
              </strong>{" "}
              {resumeData.experience_score ||
                0}
              /10
            </p>

            <p>
              <strong>
                🛠 Total Skills:
              </strong>{" "}
              {resumeData.skills?.length ||
                0}
            </p>

            <p>
              <strong>
                💼 Recommended Jobs:
              </strong>{" "}
              {resumeData.recommended_jobs
                ?.length || 0}
            </p>
          </div>

          <h2>🛠 Skills</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            {resumeData.skills?.map(
              (skill, index) => (
                <div
                  key={index}
                  style={{
                    background: "#2563eb",
                    color: "white",
                    padding: "10px 18px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {skill}
                </div>
              )
            )}
          </div>

          <br />

          <h2>💼 Recommended Jobs</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginTop: "15px",
            }}
          >
            {resumeData.recommended_jobs?.map(
              (job, index) => (
                <div
                  key={index}
                  style={{
                    background: "#f8fafc",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "12px",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow:
                      "0px 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "#1e293b",
                      minHeight: "60px",
                    }}
                  >
                    {job}
                  </h3>

                  <button
                    onClick={() =>
                      handleRoleSelect(job)
                    }
                    style={{
                      background:
                        "#2563eb",
                      color: "white",
                      border: "none",
                      padding:
                        "10px 15px",
                      borderRadius:
                        "8px",
                      cursor: "pointer",
                    }}
                  >
                    Select Role
                  </button>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ResumeUpload;