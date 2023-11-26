import Express from "express";
import cors from "cors";
import axios from "axios";
import FormData from "form-data";
import fs, { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { db } from "./db.js";
import path, { dirname } from "path";
import videoSplitter from "./videoSplitter.js";

const app = Express();
app.use(Express.json());
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.post("/process", async (req, res) => {
  console.log("[ML] Image elaboration request recieved.")
  await videoSplitter('./videos/video.mp4');
  const directoryPath = path.join(__dirname, "images");
  const filenames = readdirSync(directoryPath);
  let completeData = [];
  for (let i = 0; i < filenames.length; i++) {
    setTimeout(async () => {
      const filedata = fs.createReadStream(
        path.join(directoryPath, filenames[i])
      );
      let body = new FormData();
      body.append("upload", filedata);
    //   body.append("mmc", "true");
      body.append("regions", "it");
      await axios
        .post("https://api.platerecognizer.com/v1/plate-reader/", body, {
          headers: {
            Authorization: "Token c58ac951373fbf3c5e2602f1f9c461c6af0e3543",
            ...body.getHeaders(),
          },
        })
        .then((response) => {
           response.data.results.forEach((result) => {
            // check if car is already in our database
            db.get("SELECT plate FROM cars WHERE plate = ?", [result.plate], (err, row) => {
              if (err) {
                res.status(500).json({ message: 'Internal Server Error.'})
              }
              if (row) {
                // console.log("already in db");
                return
              }
              db.run("INSERT INTO cars (plate, region, type, acc) VALUES (?, ?, ?, ?)", [result.plate, result.region.code, result.vehicle.type, result.dscore], (err) => {
                if (err) {
                  res.status(500).json({ message: 'Internal Server Error.'})
                }
              })
            })           
           });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000 * i);
  }
  console.log("[ML] Started elaborating images with success...")
  res.status(200).json({ message: "Elaborating images..."})
})

app.post("/d", (req, res) => {
  db.run("DELETE FROM cars", (err) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error.'})
    }
    res.status(200).json({ message: "[DB] Database clear request received and completed with success."})
  })
});

app.get("/", async (req, res) => {
  db.all("SELECT * FROM cars", (err, row) => {
    if (err) {
      console.log(err);
      res.status(500).json({ 'message': "Internal Servesr Error"});
      return;
    }
    res.status(200).json(row);
  })
});

// import upload route
import uploadRoute from "./uploadRoute.js";
app.use(uploadRoute);

app.listen(8081, () => {
  console.log("[SERVER] running on port 8081");
});
