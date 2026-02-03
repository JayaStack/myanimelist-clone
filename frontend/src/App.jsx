import { useEffect } from "react";
import api from "./api/axios";

function App() {
  useEffect(() => {
    api.get("/anime").then((res) => {
      console.log("Anime from backend:", res.data);
    });
  }, []);

  return <h1>MyAnimeList Frontend</h1>;
}

export default App;
