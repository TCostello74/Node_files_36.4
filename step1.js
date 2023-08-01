const fs = require('fs');

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

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Please provide a file path as a command line argument');
  process.exit(1);
}

cat(args[0]);
