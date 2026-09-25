import { useEffect, useState } from "react";

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};

type GithubResponse = {
  items: Repository[];
};

function App() {
  const [keyword, setKeyword] = useState("react");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filterText, setFilterText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async (searchKeyword: string) => {
    if (searchKeyword.trim() === "") {
      setMessage("Please enter a keyword.");
      setRepositories([]);
      setLoading(false);
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          searchKeyword,
        )}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch repositories.");
      }

      const data: GithubResponse = await response.json();
      setRepositories(data.items);
    } catch {
      setMessage("Something went wrong.");
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories("react");
  }, []);

  const handleSearch = () => {
    fetchRepositories(keyword);
  };

  const filteredRepositories = repositories.filter((repo) =>
    repo.full_name.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <div>
      <h1>GitHub Explorer</h1>

      <div>
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <br />

      <div>
        <label htmlFor="filterInput">Filter results by repository name </label>
        <input
          id="filterInput"
          type="text"
          placeholder="Type to filter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <br />

      {loading && <p>Loading...</p>}
      {!loading && message && <p>{message}</p>}

      {!loading && !message && (
        <ul>
          {filteredRepositories.map((repo) => (
            <li key={repo.id}>
              <strong>{repo.full_name}</strong>
              <br />
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.html_url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
