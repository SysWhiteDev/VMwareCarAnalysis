import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const directory = "./images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, "image.png");
  },
});

const upload = multer({ storage: storage });
const uploadRoute = Router();

uploadRoute.post("/upload", upload.single("image"), async (req, res) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (
        path.extname(file) === ".jpg" ||
        path.extname(file) === ".png" ||
        path.extname(file) === ".gif"
      ) {
        return
      } else {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    }
  });
  res.status(200).json({ message: "Image uploaded successfully" });
});

export default uploadRoute;
