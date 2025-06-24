import React, { useState } from "react";

const Quiz = () => {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<any>(null);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async () => {
  const res = await fetch(`${baseUrl}/api/quiz_submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: [answer] }),
  });
  const data = await res.json();
  setResult(data);
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
