import React, { useState } from "react";
import { GATEWAY } from "../api/gateway";

export default function AddMovie({ onClose, onAdded }) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!name.trim()) return;
    if (!imageFile) return;
  
    const form = new FormData();
    form.append("name", name);
    form.append("image", imageFile);
  
    await GATEWAY.post("/add", form, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  
    onAdded();
    onClose();
  };
  

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h3>Add Movie</h3>

        <input
          style={styles.input}
          placeholder="Movie name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        {error && <div style={styles.error}>{error}</div>}

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button style={styles.primaryBtn} onClick={handleAdd} disabled={uploading}>
            {uploading ? "Uploading..." : "Add Movie"}
          </button>
          <button style={styles.secondaryBtn} onClick={onClose} disabled={uploading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  box: {
    width: 420,
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 6px 30px rgba(0,0,0,0.15)",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ddd",
  },
  primaryBtn: {
    background: "#0b76ff",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#6c757d",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: { color: "crimson", marginTop: 8 },
};
