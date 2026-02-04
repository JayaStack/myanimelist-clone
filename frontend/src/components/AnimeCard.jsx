import { Link } from "react-router-dom";

function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime._id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          width: 200,
          background: "#2b2b2b",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <img
          src={anime.coverImage || "https://picsum.photos/200/300"}
          style={{
            width: "100%",
            height: 280,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />

        <Link to={`/anime/${anime._id}`}>
          <h3 style={{ color: "#4f6cff" }}>{anime.title}</h3>
        </Link>
        <p>⭐ {anime.averageRating}</p>
        <small>{anime.episodes} eps</small>
      </div>
    </Link>
  );
}

export default AnimeCard;
