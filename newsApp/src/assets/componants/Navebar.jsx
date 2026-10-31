import { useState } from "react";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "Health", value: "health" },
  { name: "Education", value: "education" },
  { name: "Sports", value: "sports" },
  { name: "Society", value: "society" },
  { name: "Technology", value: "technology" },
];

function Navebar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(keyword.trim());
  }

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">
          <NavLink to="/">
            News <span>App</span>
          </NavLink>
        </div>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Active
          </NavLink>

          {categories.map((category) => (
            <NavLink
              key={category.value}
              to={`/search?category=${category.value}`}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {category.name}
            </NavLink>
          ))}

          <NavLink to="/favorites" className="nav-link favorite-link">
            <span>♥</span> Favorites
          </NavLink>
        </div>
      </div>

      <form className="navbar-search" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search for news..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>
    </nav>
  );
}

export default Navebar;
