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
          transition: "0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src={anime.coverImage || "https://picsum.photos/200/300"}
          alt={anime.title}
          style={{
            width: "100%",
            height: 280,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />

        <h3 style={{ color: "#4f6cff" }}>{anime.title}</h3>
        <p>⭐ {anime.averageRating}</p>
        <small>{anime.episodes} eps</small>
      </div>
    </Link>
  );
}

export default AnimeCard;
