
import { useFavorites } from "../../context/FavoritesContext";
import placeholder from "../image/placholder.jpg";

function NewsCard({ article }) {
  const { favorites, toggleFavorite } = useFavorites();

  const articleId = article.id || article.url;

  const isFavorite = favorites.some(
    (item) => (item.id || item.url) === articleId
  );

  return (
    <article className="news-card">
      <img
        src={article.image || placeholder}
        alt={article.title || "News image"}
        className="news-card-image"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = placeholder;
        }}
      />

      <div className="news-card-content">
        <h3>{article.title}</h3>

        <p>
          {article.description || "No description available."}
        </p>

        <button
          type="button"
          className={`favorite-btn ${isFavorite ? "is-favorite" : ""}`}
          onClick={() => toggleFavorite(article)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
    </article>
  );
}

export default NewsCard;
