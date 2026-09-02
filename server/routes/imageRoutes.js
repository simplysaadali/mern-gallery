import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Image from "../models/Image.js";
import upload from "../middleware/upload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "..", "uploads");

const router = express.Router();

// POST /api/images  -> receive the file, save it on disk, store its URL in MongoDB
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image file received" });

    // Build the public URL from the saved filename
    const base = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const imageUrl = `${base}/uploads/${req.file.filename}`;

    const image = await Image.create({ imageUrl });
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/images  -> all images, newest first
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/images/:id  -> remove the record, and the file from disk
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Image.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Image not found" });

    const filename = deleted.imageUrl.split("/uploads/")[1];
    if (filename) fs.promises.unlink(path.join(uploadDir, filename)).catch(() => {});

    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
