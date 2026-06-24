import ResumeUpload from "../components/ResumeUpload";

function ResumeUploadPage() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <ResumeUpload />
    </div>
  );
}

export default ResumeUploadPage;