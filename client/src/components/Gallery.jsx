export default function Gallery({ images, onOpen, onDelete }) {
  if (!images.length) return <p className="empty">No images yet. Upload your first one.</p>;

  return (
    <div className="grid">
      {images.map((img, i) => (
        <div className="card" key={img._id}>
          <img src={img.imageUrl} alt="" onClick={() => onOpen(i)} />
          <button className="delete" onClick={() => onDelete(img._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
