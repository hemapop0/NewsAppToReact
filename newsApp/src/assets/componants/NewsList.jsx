import NewsCard from "./NewsCard";

function NewsList({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <p className="empty-message">
        No news found.
      </p>
    );
  }

  return (
    <section className="news-list">
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
        />
      ))}
    </section>
  );
}

export default NewsList;