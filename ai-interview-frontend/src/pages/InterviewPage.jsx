import InterviewChat from "../components/InterviewChat";

function InterviewPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e293b",
          }}
        >
          AI Interview
        </h1>

        <InterviewChat />
      </div>
    </div>
  );
}

export default InterviewPage;