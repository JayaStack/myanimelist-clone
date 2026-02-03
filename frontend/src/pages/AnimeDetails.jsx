import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function AnimeDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [anime, setAnime] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get(`/anime/${id}`).then((res) => {
      setAnime(res.data.data);
    });

    api.get(`/reviews/${id}`).then((res) => {
      setReviews(res.data.data);
    });
  }, [id]);

  const addToList = async () => {
    try {
      await api.post("/lists", {
        anime: anime._id,
        status: "Watching",
      });

      alert("Added to your list!");
    } catch (err) {
      console.error(err);
      alert("You must be logged in to add to list");
    }
  };

  if (!anime) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{anime.title}</h1>
      <p>{anime.description}</p>
      <p>Studio: {anime.studio}</p>
      <p>Episodes: {anime.episodes}</p>
      <p>Rating: {anime.averageRating}</p>

      {user && <button onClick={addToList}>Add to My List</button>}

      <h3>Reviews</h3>
      {reviews.map((r) => (
        <div key={r._id}>
          <b>{r.user.username}</b>: {r.text}
        </div>
      ))}
    </div>
  );
}

export default AnimeDetails;
