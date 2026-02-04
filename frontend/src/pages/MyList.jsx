import { useEffect, useState } from "react";
import api from "../api/axios";

function MyList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/lists/my").then((res) => {
      setList(res.data.data);
    });
  }, []);

  const updateItem = async (id, data) => {
    try {
      const res = await api.put(`/lists/${id}`, data);

      setList((prev) =>
        prev.map((item) => (item._id === id ? res.data.data : item)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/lists/${id}`);
      setList((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Empty state early return
  if (list.length === 0) {
    return <p style={{ opacity: 0.7, padding: 20 }}>Your list is empty 📭</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>My Anime List</h1>

      {list.map((item) => (
        <div key={item._id} style={{ marginBottom: 15 }}>
          <h3>{item.anime.title}</h3>

          <input
            type="number"
            placeholder="Watched episodes"
            value={item.watchedEpisodes || 0}
            onChange={(e) =>
              updateItem(item._id, {
                watchedEpisodes: Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Rating"
            value={item.personalRating || ""}
            onChange={(e) =>
              updateItem(item._id, {
                personalRating: Number(e.target.value),
              })
            }
          />

          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default MyList;
