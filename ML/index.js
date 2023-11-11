import axios from 'axios';
import { readdirSync } from 'fs';
import path from 'path';

console.log(readdirSync(images))

async function query(filename) {
  let data = readFileSync(filename);
  let response = await axios({
      url: "https://api-inference.huggingface.co/models/hustvl/yolos-base",
      method: "POST",
      headers: { Authorization: "Bearer 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" },
      data: data,
  });
  return response.data;
}

function processDirectory(directory) {
 let filenames = readdirSync(directory);
 let results = filenames.map(filename => query(path.join(directory, filename)));

 Promise.all(results).then(responses => {
   let sum = responses.reduce((a, b) => a + b, 0);
   let average = sum / responses.length;
   console.log(`The average result is ${average}`);
 });
}

processDirectory('./assets');
