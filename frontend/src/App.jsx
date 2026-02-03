import { useEffect, useState, useContext } from "react";
import api from "./api/axios";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import { Routes, Route, Link } from "react-router-dom";
import AnimeDetails from "./pages/AnimeDetails";

function App() {
  const [anime, setAnime] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      api.get("/anime").then((res) => {
        setAnime(res.data.data);
      });
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Login />;

  return (
    <div style={{ padding: 20 }}>
      <h1>MyAnimeList</h1>
      <p>Welcome, {user.username}</p>

      <Routes>
        <Route
          path="/"
          element={anime.map((a) => (
            <div key={a._id}>
              <Link to={`/anime/${a._id}`}>
                <h3>{a.title}</h3>
              </Link>
              <small>Rating: {a.averageRating}</small>
            </div>
          ))}
        />

        <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
