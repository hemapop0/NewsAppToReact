
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  
function toggleFavorite(article) {
  const articleId = article.id || article.url;

  setFavorites((previous) => {
    const exists = previous.some(
      (item) => (item.id || item.url) === articleId
    );

    return exists
      ? previous.filter(
          (item) => (item.id || item.url) !== articleId
        )
      : [...previous, article];
  });
}


  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === null) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
