import { useEffect, useState, useContext } from "react";
import api from "./api/axios";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import { Routes, Route, Link } from "react-router-dom";
import AnimeDetails from "./pages/AnimeDetails";
import MyList from "./pages/MyList";

function App() {
  const [anime, setAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      api
        .get(`/anime?search=${search}&genre=${genre}`)
        .then((res) => {
          setAnime(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, search, genre]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Login />;

  return (
    <div style={{ padding: 20 }}>
      <h1>MyAnimeList</h1>
      <p>Welcome, {user.username}</p>

      {/* Navigation */}
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> | <Link to="/my-list">My List</Link>
      </nav>

      {/* Filters only on Home */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div style={{ marginBottom: 20 }}>
                <input
                  placeholder="Search anime..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  style={{ marginLeft: 10 }}
                >
                  <option value="">All</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Drama">Drama</option>
                </select>
              </div>

              {anime.map((a) => (
                <div key={a._id}>
                  <Link to={`/anime/${a._id}`}>
                    <h3>{a.title}</h3>
                  </Link>
                  <small>Rating: {a.averageRating}</small>
                </div>
              ))}
            </>
          }
        />

        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/my-list" element={<MyList />} />
      </Routes>
    </div>
  );
}

export default App;
