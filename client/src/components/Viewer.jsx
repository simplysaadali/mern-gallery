import { useEffect } from "react";

export default function Viewer({ images, index, onClose, onChange, onDelete }) {
  const prev = () => onChange((index - 1 + images.length) % images.length);
  const next = () => onChange((index + 1) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const image = images[index];

  return (
    <div className="overlay" onClick={onClose}>
      <div className="viewer" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>X</button>
        <button className="nav left" onClick={prev}>&#8249;</button>
        <img src={image.imageUrl} alt="" />
        <button className="nav right" onClick={next}>&#8250;</button>
        <div className="viewer-footer">
          <span>Image {index + 1} of {images.length}</span>
          <button className="delete" onClick={() => onDelete(image._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
