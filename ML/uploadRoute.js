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
    // Access the code from req.body and use it as part of the filename
    const code = req.headers.code;
    cb(null, `${code}.png`);
  },
});

const upload = multer({ storage: storage });
const uploadRoute = Router();

uploadRoute.post("/upload", upload.single("image"), async (req, res) => {
  if (req.headers.code == "000000") {
    return res.status(400).json({ message: "Invalid code" });
  }
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (
        path.extname(file) === ".jpg" ||
        path.extname(file) === ".png" ||
        path.extname(file) === ".gif"
      ) {
        return;
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
