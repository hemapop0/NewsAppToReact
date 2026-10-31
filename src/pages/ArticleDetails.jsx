import { useCallback } from "react";
import { useParams } from "react-router-dom";

import { getLatestNews } from "../services/newsApi";
import useNews from "../Hock/userNews";

function ArticleDetails() {
  const { id } = useParams();

  const fetchLatestNews = useCallback(() => {
    return getLatestNews();
  }, []);

  const { articles, loading, error } = useNews(fetchLatestNews);

  if (loading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  const article = articles.find(
    (item) => String(item.id) === id
  );

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <main className="article-details">
      <img
        src={article.image}
        alt={article.title}
      />

      <span>{article.published}</span>

      <h1>{article.title}</h1>

      <p>{article.description}</p>

      {article.url && (
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
        >
          Read Full Article
        </a>
      )}
    </main>
  );
}

export default ArticleDetails;