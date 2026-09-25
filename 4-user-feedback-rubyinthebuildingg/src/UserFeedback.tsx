import { useState } from "react";

function UserFeedback() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "" || message.trim() === "") {
      setError("Please fill in both fields.");
      return;
    }

    setSubmittedName(name);
    setSubmittedMessage(message);

    setName("");
    setMessage("");
    setError("");
  };

  return (
    <div>
      <h2>User Feedback</h2>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Send</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {submittedName && submittedMessage && (
        <div>
          <h3>Submitted Feedback</h3>
          <p><strong>Name:</strong> {submittedName}</p>
          <p><strong>Message:</strong> {submittedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default UserFeedback;
