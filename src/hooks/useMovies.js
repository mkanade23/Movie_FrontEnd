import { useState, useCallback } from "react";
import { GATEWAY } from "../api/gateway";

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await GATEWAY.get("/all");
      setMovies(res.data || []);
    } catch (e) {
      console.error("Failed loading movies", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMovie = useCallback(async (id) => {
    await GATEWAY.delete(`/delete/${id}`);
    await loadMovies();
  }, [loadMovies]);

  return { movies, loadMovies, loading, deleteMovie };
}
