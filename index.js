const path = require("path");
const fs = require("fs");

const searchFilesInDirectory = (dir, filter, ext) => {
  filter = "Helloworld";  //text

  dir = "..\\MitsWeb-fe\\src"; //path to search

  ext = ".js"; //file extension

  if (!fs.existsSync(dir)) {
    console.log(`Specified directory: ${dir} does not exist`);
    return;
  }

  const files = getFilesInDirectory(dir, ext);
  var x = 0;
  console.clear();
  files.forEach((file) => {
    const fileContent = fs.readFileSync(file);

    // We want full words, so we use full word boundary in regex.
    const regex = new RegExp("\\b" + filter + "\\b");
    if (regex.test(fileContent)) {
      x = 1;
      console.log(filter, `was found in file: ${file}`);
    }
  });
  if (x == 0) {
    console.log("Not found");
  }
};

// Using recursion, we find every file with the desired extention, even if its deeply nested in subfolders.
const getFilesInDirectory = (dir, ext) => {
  if (!fs.existsSync(dir)) {
    console.log(`Specified directory: ${dir} does not exist`);
    return;
  }

  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);

    // If we hit a directory, apply our function to that dir. If we hit a file, add it to the array of files.
    if (stat.isDirectory()) {
      const nestedFiles = getFilesInDirectory(filePath, ext);
      files = files.concat(nestedFiles);
    } else {
      if (path.extname(file) === ext) {
        files.push(filePath);
      }
    }
  });

  return files;
};
searchFilesInDirectory(process.argv[2], process.argv[3], process.argv[4]);
