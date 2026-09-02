import { useEffect, useState } from "react";
import { getImages, deleteImage, uploadImage } from "./api";
import UploadForm from "./components/UploadForm";
import Gallery from "./components/Gallery";
import Viewer from "./components/Viewer";

export default function App() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(null); // index of the open image
  const [busy, setBusy] = useState(false);

  const load = () => getImages().then(setImages).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleUpload = async (file) => {
    setBusy(true);
    try {
      await uploadImage(file); // server stores the file and saves its URL
      await load();            // refresh the grid
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this image?")) return;
    await deleteImage(id);
    setCurrent(null);
    setImages((prev) => prev.filter((img) => img._id !== id));
  };

  return (
    <div className="app">
      <header>
        <h1>MERN Gallery</h1>
        <span>{images.length} images</span>
      </header>

      <UploadForm onUpload={handleUpload} busy={busy} />
      <Gallery images={images} onOpen={setCurrent} onDelete={handleDelete} />

      {current !== null && (
        <Viewer
          images={images}
          index={current}
          onClose={() => setCurrent(null)}
          onChange={setCurrent}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
