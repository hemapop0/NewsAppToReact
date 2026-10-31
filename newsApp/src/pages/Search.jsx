import { useState } from "react";

import NewsList from "../assets/componants/NewsList";
import SearchBar from "../assets/componants/searchBar";

import { searchNews } from "../services/newsApi";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!keyword.trim()) return;

    try {
      setLoading(true);
      setError("");

      const result = await searchNews(keyword.trim());

      setArticles(result);
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Search News</h1>
      
      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
      />

      {loading && <p>Searching...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <NewsList articles={articles} />
      )}
    </main>
  );
}

export default Search;