import { useCallback } from "react";

import Header from "../assets/componants/Header";
import NewsList from "../assets/componants/NewsList";

import { getLatestNews } from "../services/newsApi";
import useNews from "../Hock/userNews";

function Home() {
  const fetchLatestNews = useCallback(() => {
    return getLatestNews();
  }, []);

  const { articles, loading, error } = useNews(fetchLatestNews);

  return (
    <main>
      <Header />

      <h2>Latest News</h2>

      {loading && <p>Loading news...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <NewsList articles={articles} />
      )}
    </main>
  );
}

export default Home;