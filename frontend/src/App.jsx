import { useEffect, useState } from "react";
import api from "./api/axios";

function App() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    api.get("/anime").then((res) => {
      setAnime(res.data.data);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>MyAnimeList</h1>

      {anime.map((a) => (
        <div key={a._id} style={{ marginBottom: 10 }}>
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          <small>
            Rating: {a.averageRating} | Episodes: {a.episodes}
          </small>
        </div>
      ))}
    </div>
  );
}

export default App;
