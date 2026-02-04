import { useEffect, useState, useContext } from "react";
import api from "./api/axios";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import { Routes, Route, Link } from "react-router-dom";
import AnimeDetails from "./pages/AnimeDetails";
import MyList from "./pages/MyList";
import AnimeCard from "./components/AnimeCard";

function App() {
  const [anime, setAnime] = useState([]);
  const [trending, setTrending] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const { user, loading } = useContext(AuthContext);

  // Fetch filtered anime
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

  // Fetch trending once after login
  useEffect(() => {
    if (user) {
      api.get("/anime/trending").then((res) => {
        setTrending(res.data.data);
      });
    }
  }, [user]);

  // Auth loading
  if (loading) return <p>Loading...</p>;
  if (!user) return <Login />;

  // Anime loading (your requested addition)
  if (anime.length === 0) return <p>Loading anime...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>MyAnimeList</h1>
      <p>Welcome, {user.username}</p>

      {/* Navigation */}
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> | <Link to="/my-list">My List</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Trending Section */}
              <h2>🔥 Trending Anime</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: 20,
                  marginBottom: 30,
                }}
              >
                {trending.map((a) => (
                  <AnimeCard key={a._id} anime={a} />
                ))}
              </div>

              <hr style={{ margin: "20px 0" }} />

              {/* Filters */}
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

              {/* Anime Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: 20,
                }}
              >
                {anime.map((a) => (
                  <AnimeCard key={a._id} anime={a} />
                ))}
              </div>
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
