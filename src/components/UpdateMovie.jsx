import React, { useState } from "react";
import { GATEWAY } from "../api/gateway";

export default function UpdateMovie({ movie, onClose, onUpdated }) {
  const [name, setName] = useState(movie.name);
  const [image, setImage] = useState(null);

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("name", name);

    if (image) {
      form.append("image", image);
    }

    await GATEWAY.put(`/update/${movie.id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    onUpdated();
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h3>Update Movie</h3>

        <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button style={styles.btn} onClick={handleUpdate}>Save</button>
        <button style={styles.closeBtn} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" },
  box: { background: "#fff", padding: 20, borderRadius: 6 },
  input: { width: "100%", padding: 8, marginBottom: 10 },
  btn: { background: "#28a745", color: "#fff", padding: "8px 12px", border: "none" },
  closeBtn: { marginLeft: 10, padding: "8px 12px" },
};
