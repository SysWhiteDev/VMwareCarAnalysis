/*import axios from 'axios';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';

//for (let i = 0; i < images.length; i++) {
//  console.log(readdirSync('images')[i]);
//}
//console.log('fhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

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

    console.log(directory);
    console.log('fhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

    let filenames = readdirSync(directory);

    console.log(filenames);
    
    let results = filenames.map(filename => query(path.join(directory, filename)));

    console.log(results);

    Promise.all(results).then(responses => {
      let sum = responses.reduce((a, b) => a + b, 0);
      let average = sum / responses.length;
      console.log(`The average result is ${average}`);
    });

   }

processDirectory('./images');

*/




import axios from 'axios';
import { readFileSync } from 'fs';

function query(filename) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = readFileSync(filename);
      const response = await axios({
        url: "https://api-inference.huggingface.co/models/hustvl/yolos-base",
        method: "POST",
        headers: { Authorization: "Bearer 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" },
        data: data,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

var jsonData = [];

query("./assets/1.png")
  .then((response) => {
    console.log(JSON.stringify(response));
    jsonData.push(response);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(() => {

    //console.log(jsonData);

    const newData = jsonData.map(frame => frame.map(({ score, label }) => ({ score, label })));

    console.log(newData['']);

  });
