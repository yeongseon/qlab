import React, { useState } from "react";

const Quiz = () => {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/quiz_submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: [answer] }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
      setError(null);
    } catch (err: any) {
      console.error("Error submitting quiz:", err);
      setError("Failed to submit. Please try again.");
    }
  };

  return (
    <div>
      <p>Do you enjoy spending time with friends?</p>
      <button onClick={() => setAnswer("yes")}>Yes</button>
      <button onClick={() => setAnswer("no")}>No</button>
      <br />
      <button onClick={handleSubmit} disabled={!answer}>
        Submit Answer
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h2>Result: {result.type}</h2>
          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
