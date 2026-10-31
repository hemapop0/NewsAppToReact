
import { useEffect, useState } from "react";

function useNews(fetchFunction) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const result = await fetchFunction();

        if (active) {
          setArticles(result);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      active = false;
    };
  }, [fetchFunction]);

  return { articles, loading, error, setArticles };
}

export default useNews;
