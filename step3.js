const fs = require('fs');
const axios = require('axios');

function cat(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading ${path}:\n  ${err}`);
      } else {
        resolve(data);
      }
    });
  });
}

function webCat(url) {
  return axios.get(url)
    .then(resp => resp.data)
    .catch(err => {
      throw `Error fetching ${url}:\n  ${err}`;
    });
}

function handleOutput(outputPath, data) {
  if (outputPath) {
    fs.writeFile(outputPath, data, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${outputPath}:\n  ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

function processInput(isWeb, inputPath, outputPath) {
  const reader = isWeb ? webCat : cat;

  reader(inputPath)
    .then(data => handleOutput(outputPath, data))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

let outputPath;
let inputPath;
if (process.argv[2] === '--out') {
  outputPath = process.argv[3];
  inputPath = process.argv[4];
} else {
  inputPath = process.argv[2];
}

const isWeb = inputPath.startsWith('http://') || inputPath.startsWith('https://');
processInput(isWeb, inputPath, outputPath);
