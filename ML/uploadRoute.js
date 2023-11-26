import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const directory = "./images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "videos/");
  },
  filename: (req, file, cb) => {
    cb(null, "video.mp4");
  },
});

const upload = multer({ storage: storage });
const uploadRoute = Router();

uploadRoute.post("/upload", upload.single("video"), async (req, res) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      // Check if the file is an image
      if (
        path.extname(file) === ".jpg" ||
        path.extname(file) === ".png" ||
        path.extname(file) === ".gif"
      ) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    }
  });
  res.status(200).json({ message: "Video uploaded successfully" });
});

export default uploadRoute;
