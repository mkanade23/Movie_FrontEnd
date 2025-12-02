import React, { useEffect, useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import AddMovie from "../components/AddMovie";
import UpdateMovie from "../components/UpdateMovie";
import Loader from "../components/Loader";

export default function MovieList() {
  const { movies, loadMovies, loading, deleteMovie } = useMovies();
  const [showAdd, setShowAdd] = useState(false);
  const [editMovie, setEditMovie] = useState(null);

  useEffect(() => { loadMovies(); }, [loadMovies]);

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: 8 }}>Movies</h1>

      {loading && <Loader />}

      <div style={styles.grid}>
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onEdit={(movie) => setEditMovie(movie)}
            onDelete={(id) => {
              if (window.confirm("Delete movie?")) deleteMovie(id);
            }}
          />
        ))}

        {movies.length === 0 && !loading && (
          <div style={{ padding: 20, color: "#666" }}>No movies yet. Click "Add Movie".</div>
        )}
      </div>

      {/* Add Movie button bottom center */}
      <div style={styles.addWrapper}>
        <button style={styles.addBtn} onClick={() => setShowAdd(true)}>Add Movie</button>
      </div>

      {showAdd && (
        <AddMovie
          onClose={() => setShowAdd(false)}
          onAdded={() => loadMovies()}
        />
      )}

      {editMovie && (
        <UpdateMovie
          movie={editMovie}
          onClose={() => setEditMovie(null)}
          onUpdated={() => loadMovies()}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    background: "#f3f6fb",
    minHeight: "100vh",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  addWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: 18,
  },
  addBtn: {
    padding: "12px 22px",
    background: "#0069d9",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
  },
};
