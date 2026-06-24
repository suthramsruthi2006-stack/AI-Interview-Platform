import ReportCard from "../components/ReportCard";

function ReportsPage() {
  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e293b",
          marginBottom: "30px",
        }}
      >
        📊 Interview Reports
      </h1>

      <ReportCard />
    </div>
  );
}

export default ReportsPage;