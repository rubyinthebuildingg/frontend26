import { useState } from "react";

type TriviaQuestion = {
  question: string;
};

type TriviaResponse = {
  results: TriviaQuestion[];
};

function App() {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuestion = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://opentdb.com/api.php?amount=1");

      if (response.status === 429) {
        setError("Please try again in a moment.");
        setQuestion("");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }

      const data: TriviaResponse = await response.json();
      setQuestion(data.results[0].question);
    } catch {
      setError("Something went wrong.");
      setQuestion("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Trivia App</h1>

      <button onClick={fetchQuestion}>Get Trivia Question</button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : question ? (
        <p dangerouslySetInnerHTML={{ __html: question }} />
      ) : (
        <p>Click the button to get a trivia question!</p>
      )}
    </div>
  );
}

export default App;
