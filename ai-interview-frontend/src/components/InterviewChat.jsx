import { useState } from "react";
import axios from "axios";

function InterviewChat() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [evaluationLoading, setEvaluationLoading] = useState(false);

  const [difficulty, setDifficulty] =
    useState("Medium");

  const selectedRole =
    localStorage.getItem("selectedRole") ||
    "General Role";

  const startInterview = async () => {
    try {
      setQuestionLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/interview/start",
        {
          role: selectedRole,
          difficulty: difficulty,
        }
      );

      let questionData =
        response.data.questions;

      if (typeof questionData === "string") {
        questionData = questionData
          .split("\n")
          .filter(
            (q) =>
              q.trim() !== "" &&
              !q.includes("```")
          );
      }

      if (
        !questionData ||
        questionData.length === 0
      ) {
        alert("No questions received");
        return;
      }

      setQuestions(questionData);

      setAnswers(
        new Array(questionData.length).fill("")
      );
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          error.response.data.detail ||
            "Failed to start interview"
        );
      } else {
        alert("Failed to start interview");
      }
    } finally {
      setQuestionLoading(false);
    }
  };

  const handleAnswerChange = (
    index,
    value
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const submitAnswers = async () => {
    try {
      setEvaluationLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/interview/evaluate",
        {
          role: selectedRole,
          questions,
          answers,
        }
      );

      try {
        await axios.post(
          "http://127.0.0.1:8000/reports/save",
          {
            candidate_id: 1,
            role: selectedRole,
            technical_score:
              response.data.technical_score,
            communication_score:
              response.data.communication_score,
            overall_score:
              response.data.overall_score,
            feedback:
              response.data.feedback,
          }
        );
      } catch (saveError) {
        console.log(
          "Report save skipped:",
          saveError
        );
      }

      localStorage.setItem(
        "totalInterviews",
        "1"
      );

      localStorage.setItem(
        "averageScore",
        `${response.data.overall_score}/10`
      );

      localStorage.setItem(
        "highestScore",
        `${response.data.overall_score}/10`
      );

      localStorage.setItem(
        "feedbackData",
        JSON.stringify(response.data)
      );

      window.location.href =
        "/feedback";

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );
      } else {
        alert("Evaluation Failed");
      }
    } finally {
      setEvaluationLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "15px",
        maxWidth: "1000px",
        margin: "20px auto",
        boxShadow:
          "0px 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#1e293b",
        }}
      >
        AI Interview - {selectedRole}
      </h2>

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Select Difficulty:
        </label>

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(
              e.target.value
            )
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>
        </select>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={startInterview}
          disabled={questionLoading}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {questionLoading
            ? "🤖 Generating Questions..."
            : "🚀 Start Interview"}
        </button>
      </div>

      {questions.length > 0 && (
        <div>
          <h3>Interview Questions</h3>

          {questions.map(
            (question, index) => (
              <div
                key={index}
                style={{
                  background: "#f8fafc",
                  border:
                    "1px solid #cbd5e1",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "10px",
                }}
              >
                <p>
                  <strong>
                    Question {index + 1}
                  </strong>
                </p>

                <p>{question}</p>

                <textarea
                  rows="4"
                  value={answers[index]}
                  onChange={(e) =>
                    handleAnswerChange(
                      index,
                      e.target.value
                    )
                  }
                  placeholder="Type your answer here..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border:
                      "1px solid #cbd5e1",
                  }}
                />
              </div>
            )
          )}

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <button
              onClick={submitAnswers}
              disabled={evaluationLoading}
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {evaluationLoading
                ? "📊 Evaluating Answers..."
                : "✅ Submit Answers"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewChat;