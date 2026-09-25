import { useState } from "react";

type QuizQuestion = {
  text: string;
  level: string;
};

function QuizForm() {
  const [question, setQuestion] = useState("");
  const [level, setLevel] = useState("Easy");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [randomQuestion, setRandomQuestion] = useState<QuizQuestion | null>(null);

  const addQuestion = () => {
    if (question.trim() === "") return;

    const newQuestion: QuizQuestion = {
      text: question,
      level: level,
    };

    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setLevel("Easy");
  };

  const playRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setRandomQuestion(questions[randomIndex]);
  };

  return (
    <div>
      <h2>Quiz Game</h2>

      <div>
        <input
          type="text"
          placeholder="Type a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <button onClick={addQuestion}>Add Question</button>
      </div>

      <br />

      <button onClick={playRandomQuestion} disabled={questions.length < 3}>
        Play
      </button>

      <p>Questions added: {questions.length}</p>

      {randomQuestion && (
        <div>
          <h3>Random Question</h3>
          <p>
            <strong>Question:</strong> {randomQuestion.text}
          </p>
          <p>
            <strong>Level:</strong> {randomQuestion.level}
          </p>
        </div>
      )}
    </div>
  );
}

export default QuizForm;