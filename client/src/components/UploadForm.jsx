import { useState } from "react";

export default function UploadForm({ onUpload, busy }) {
  const [file, setFile] = useState(null);

  const submit = () => {
    if (!file) return alert("Please choose an image first.");
    onUpload(file);
    setFile(null);
  };

  return (
    <div className="upload-bar">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={submit} disabled={busy}>{busy ? "Uploading..." : "Upload"}</button>
    </div>
  );
}
