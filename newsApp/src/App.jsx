
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navebar from "./assets/componants/Navebar";
import Footer from "./assets/componants/Footer";
import NewsList from "./assets/componants/NewsList";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import ArticleDetails from "./pages/ArticleDetails";

import { FavoritesProvider } from "./context/FavoritesContext";
import { searchNews } from "./services/newsApi";

function AppContent() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  async function handleSearch(keyword) {
    if (!keyword) {
      setSearchResults([]);
      setSearchError("");
      setSearchActive(false);
      return;
    }

    try {
      setSearchActive(true);
      setSearchLoading(true);
      setSearchError("");

      const result = await searchNews(keyword);
      setSearchResults(result);
    } catch (error) {
      setSearchResults([]);
      setSearchError(error.message);
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <>
      <Navebar onSearch={handleSearch} />

      {searchActive ? (
        <main>
          <h2>Search Results</h2>

          {searchLoading && <p>Searching...</p>}

          {searchError && (
            <p className="error-message">{searchError}</p>
          )}

          {!searchLoading && !searchError && (
            <NewsList articles={searchResults} />
          )}
        </main>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
        </Routes>
      )}

      <Footer />
    </>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
