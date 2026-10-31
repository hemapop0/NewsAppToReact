import { useFavorites } from "../context/FavoritesContext";
import NewsList from "../assets/componants/NewsList";

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <main>
      <h1>My Favorite News</h1>

      {favorites.length === 0 ? (
        <p className="empty-message">
          You haven't added any favorite news yet.
        </p>
      ) : (
        <NewsList articles={favorites} />
      )}
    </main>
  );
}

export default Favorites;