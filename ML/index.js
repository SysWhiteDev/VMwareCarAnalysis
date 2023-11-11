import Express from "express";
import cors from "cors";
import axios from "axios";
import FormData from "form-data";
import fs, { readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const app = Express();
app.use(Express.json());
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", async (req, res) => {
  const directoryPath = path.join(__dirname, "images");
  const filenames = readdirSync(directoryPath);

  for (let i = 0; i < filenames.length; i++) {
    setTimeout(async () => {
      const filedata = fs.createReadStream(path.join(directoryPath, filenames[i]));
      let body = new FormData();
      body.append("upload", filedata);
      body.append("regions", "it");
      await axios
        .post("https://api.platerecognizer.com/v1/plate-reader/", body, {
          headers: {
            Authorization: "Token 9f99ec0695d8a093ccf8d4bcb314fae8028be130",
            ...body.getHeaders(),
          },
        })
        .then((response) => {
          console.log(response.data.box);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 3000 * i);
  }
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
