import axios from 'axios';
import { readFileSync } from 'fs';

async function query(filename) {
   const data = readFileSync(filename);
   const response = await axios({
       url: "https://api-inference.huggingface.co/models/hustvl/yolos-base",
       method: "POST",
       headers: { Authorization: "Bearer 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" },
       data: data,
   });
   return response.data;
}

query("./assets/1.png").then((response) => {
   console.log(JSON.stringify(response));
});
