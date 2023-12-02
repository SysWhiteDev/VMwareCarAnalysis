import Express from "express";
import cors from "cors";
import axios from "axios";
import FormData from "form-data";
import fs, { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import db from "./db.js";
import "dotenv/config";
import path, { dirname } from "path";


const app = Express();
app.use(Express.json());
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.post("/process", async (req, res) => {
  console.log("[ML] Image elaboration request recieved.")
//  await videoSplitter('./videos/video.mp4');
  const directoryPath = path.join(__dirname, "images");
  const filenames = readdirSync(directoryPath);
      const filedata = fs.createReadStream(
        path.join(directoryPath, filenames[0])
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
            db.query("SELECT plate FROM cars WHERE plate = ?", [result.plate], (err, row) => {
              if (err) {
                res.status(500).json({ message: 'Internal Server Error.'})
              }
              if (row.length > 0) {
                // console.log("already in db");
                return
              }
              db.execute("INSERT INTO cars (plate, region, type, acc) VALUES (?, ?, ?, ?)", [result.plate, result.region.code, result.vehicle.type, result.dscore], (err) => {
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
  console.log("[ML] Started elaborating images with success...")
  res.status(200).json({ message: "Elaborating images..."})
})

app.post("/d", (req, res) => {
  db.execute("DELETE FROM cars", (err) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error.'})
    }
    res.status(200).json({ message: "[DB] Database clear request received and completed with success."})
  })
});

app.get("/", async (req, res) => {
  db.query("SELECT * FROM cars", (err, row) => {
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

app.listen(process.env.PORT, () => {
  console.log(`[SERVER] running on port ${process.env.PORT}`);
});
