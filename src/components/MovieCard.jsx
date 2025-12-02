import React from "react";
import { IMAGE_BASE } from "../utils/constants";

export default function MovieCard({ movie, onEdit, onDelete }) {
  const imageUrl = `${IMAGE_BASE}${movie.imagePath}`;

  return (
    <div style={styles.card}>
      <div style={styles.imageWrap}>
        <img
          src={imageUrl}
          alt={movie.name}
          style={styles.image}
          onError={(e) => { e.target.src = ""; }}
        />
     

        <div style={styles.bottomBar}>
          <button style={styles.updateBtn} onClick={() => onEdit(movie)}>Update</button>
          <button style={styles.deleteBtn} onClick={() => onDelete(movie.id)}>Delete</button>
        </div>
      </div>

      <div style={styles.title}>{movie.name}</div>
    </div>
  );
}



const styles = {
  card: {
    width: 260,
    margin: 12,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  imageWrap: {
    position: "relative",
    height: 320,
    background: "#f6f6f6",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  bottomBar: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  updateBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    background: "rgba(255,165,0,0.95)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    background: "rgba(220,53,69,0.95)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  title: {
    padding: "12px",
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
  }
};
