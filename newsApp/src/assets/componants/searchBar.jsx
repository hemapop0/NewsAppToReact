
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getNewsByCategory } from "../../services/newsApi";
import NewsCard from "./NewsCard";

function Search() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        if (!category) {
          setArticles([]);
          return;
        }

        const result = await getNewsByCategory(category);
        setArticles(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [category]);

  if (loading) {
    return <p>Loading news...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="search-page">
      <h2>
        {category
          ? `${category.charAt(0).toUpperCase()}${category.slice(1)} News`
          : "Search News"}
      </h2>

      {articles.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <div className="news-container">
          {articles.map((article, index) => (
            <NewsCard
              key={article.id || article.url || index}
              article={article}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Search;
