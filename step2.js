const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

// Check if the argument starts with 'http://' or 'https://'
if (process.argv[2].startsWith('http://') || process.argv[2].startsWith('https://')) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
