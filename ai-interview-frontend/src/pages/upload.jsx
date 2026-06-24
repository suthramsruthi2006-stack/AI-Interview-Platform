import { useState } from "react";
import axios from "axios";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
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

      alert("Resume Uploaded Successfully");
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1>Resume Upload</h1>

      <br />

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload Resume
      </button>

      <br />
      <br />

      {resumeData && (
        <div>
          <h2>Skills</h2>

          <ul
            style={{
              listStyle: "none",
            }}
          >
            {resumeData.skills?.map(
              (skill, index) => (
                <li key={index}>
                  {skill}
                </li>
              )
            )}
          </ul>

          <br />

          <h2>Recommended Jobs</h2>

          <ul
            style={{
              listStyle: "none",
            }}
          >
            {resumeData.recommended_jobs?.map(
              (job, index) => (
                <li key={index}>
                  {job}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;